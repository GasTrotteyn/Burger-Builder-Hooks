import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/sideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerColseHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerColseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
