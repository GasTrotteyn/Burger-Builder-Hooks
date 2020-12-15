import React, { useState } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/sideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
    // state = {
    //     showSideDrawer: false,
    // };

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerColseHandler = () => {
        setShowSideDrawer(false);
    };
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prev) => !prev.showSideDrawer);
    };

    return (
        <Auxiliary>
            <Toolbar
                isAuth={props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuth={props.isAuth}
                open={showSideDrawer}
                closed={sideDrawerColseHandler}
            />
            <main className={classes.Content}>{props.children}</main>
        </Auxiliary>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
