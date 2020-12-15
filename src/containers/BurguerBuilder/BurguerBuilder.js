import React, { Component } from "react";

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

class BurguerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.fetchIngredients();
        const tokenInStorage = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const expireDate = localStorage.getItem("expireDate");

        if (tokenInStorage) {
            this.props.onAutoLog(tokenInStorage, userId, expireDate);
        }
    }

    updatePurchaseState() {
        const sum = Object.keys(this.props.ings)
            .map((igKey) => {
                return this.props.ings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.history.push("/authorization");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>the Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burguer ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.addedItemHandler}
                        ingredientRemoved={this.props.removedItemHandler}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuth}
                    />
                </Auxiliary>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                ></OrderSummary>
            );
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

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
        removedItemHandler: (ingName) => dispatch(actions.removeIngredient(ingName)),
        fetchIngredients: () => dispatch(actions.fetchIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseBurgerInit()),
        onAutoLog: (token, userId, expireDate) => dispatch(actions.autoLog(token, userId, expireDate)),
        onLogout: () => dispatch(actions.authLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
