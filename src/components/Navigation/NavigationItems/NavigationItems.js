import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Button from "../../UI/Button/Button";

const NavigationiItems = (props) => {
    let isLogin = { message: "You are logged", class: "Success" };
    if (!props.isAuth) {
        isLogin = { message: "You are an extranger", class: "Danger" };
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {props.isAuth ? (
                <NavigationItem link="/logout">Logout</NavigationItem>
            ) : (
                <NavigationItem link="/authorization">Authenticate</NavigationItem>
            )}
            <Button btnType={isLogin.class}>{isLogin.message}</Button>
        </ul>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         token: state.auth.token,
//     };
// };

export default NavigationiItems;
