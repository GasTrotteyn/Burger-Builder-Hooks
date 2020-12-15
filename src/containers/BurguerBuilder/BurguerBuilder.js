import React, { useEffect, useState } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burguer from "../../components/Burger/Burguer";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const BurguerBuilder = (props) => {
    // state = {
    //     purchasing: false,
    // };

    const [purchasing, setPurchasing] = useState(false);
    const { fetchIngredients, onAutoLog } = props;

    useEffect(() => {
        fetchIngredients();
        const tokenInStorage = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const expireDate = localStorage.getItem("expireDate");

        if (tokenInStorage) {
            onAutoLog(tokenInStorage, userId, expireDate);
        }
    }, [fetchIngredients, onAutoLog]);

    const updatePurchaseState = () => {
        const sum = Object.keys(props.ings)
            .map((igKey) => {
                return props.ings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(true);
        } else {
            props.history.push("/authorization");
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push("/checkout");
    };

    const disabledInfo = {
        ...props.ings,
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = props.error ? (
        <p>the Ingredients can't be loaded!</p>
    ) : (
        <Spinner />
    );

    if (props.ings) {
        burger = (
            <Auxiliary>
                <Burguer ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.addedItemHandler}
                    ingredientRemoved={props.removedItemHandler}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState()}
                    ordered={purchaseHandler}
                    price={props.price}
                    isAuth={props.isAuth}
                />
            </Auxiliary>
        );
        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                price={props.price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            ></OrderSummary>
        );
    }
    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.bur.ingredients,
        price: state.bur.totalPrice,
        error: state.bur.error,
        isAuth: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addedItemHandler: (ingName) => dispatch(actions.addIngredient(ingName)),
        removedItemHandler: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        fetchIngredients: () => dispatch(actions.fetchIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseBurgerInit()),
        onAutoLog: (token, userId, expireDate) =>
            dispatch(actions.autoLog(token, userId, expireDate)),
        onLogout: () => dispatch(actions.authLogout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurguerBuilder, axios));
