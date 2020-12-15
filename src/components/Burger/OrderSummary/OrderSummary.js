import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igK) => (
            <li key={igK}>
                <span style={{ textTransform: "capitalize" }}>{igK}</span>: {this.props.ingredients[igK]}
            </li>
        ));
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burguer with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    <strong>Total Price: $ {this.props.price.toFixed(2)}</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">
                    CANCEL
                </Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">
                    CONTINUE
                </Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;
