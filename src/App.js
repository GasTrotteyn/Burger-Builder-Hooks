import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurguerBuilder/BurguerBuilder";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";

const app = (props) => {
    let routes = (
        <Switch>
            <Route path="/authorization" component={Auth} />
            <Route path="/" component={BurguerBuilder} />
            <Redirect to="/" />
        </Switch>
    );
    if (props.isLoged) {
        routes = (
            <Switch>
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/logout" component={Logout} />
                <Route path="/authorization" component={Auth} />
                <Route path="/" component={BurguerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <div>
            <BrowserRouter>
                <Layout>{routes}</Layout>
            </BrowserRouter>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoged: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(app);
