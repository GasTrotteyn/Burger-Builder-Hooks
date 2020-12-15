import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post("/orders.json?auth=" + token, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => dispatch(purchaseBurgerFail(error)));
    };
};

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const setOrders = (orders) => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders,
    };
};

export const showErrorFetchingOrders = (error) => {
    return {
        type: actionTypes.SHOW_ERROR_FETCHING_ORDERS,
        error: error,
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios
            .get("/orders.json" + queryParams)
            .then((resp) => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key,
                    });
                }
                dispatch(setOrders(fetchedOrders));
            })
            .catch((error) => {
                dispatch(showErrorFetchingOrders(error));
            });
    };
};
