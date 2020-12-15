import * as actionsTypes from "../actions/actionsTypes";
import { updatedObject } from "../../shared/utillity";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    loadingOrders: false,
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, { id: action.id });
    return updatedObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
    });
};
const purchaseBurgerFail = (state, action) => {
    return updatedObject(state, { loading: false });
};
const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, { loading: true });
};
const purchaseBurgerInit = (state, action) => {
    return updatedObject(state, { purchased: false });
};

const fetchOrdersStart = (state, action) => {
    return updatedObject(state, { loadingOrders: true });
};

const setOrders = (state, action) => {
    return updatedObject(state, { loadingOrders: false, orders: action.orders });
};

const showFetchingErrors = (state, action) => {
    return updatedObject(state, { loadingOrders: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionsTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);
        case actionsTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionsTypes.PURCHASE_BURGER_INIT:
            return purchaseBurgerInit(state, action);
        case actionsTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
        case actionsTypes.SET_ORDERS:
            return setOrders(state, action);
        case actionsTypes.SHOW_ERROR_FETCHING_ORDERS:
            return showFetchingErrors(state, action);
        default:
            return state;
    }
};

export default reducer;
