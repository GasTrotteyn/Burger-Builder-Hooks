import axios from "axios";

import * as actionTypes from "./actionsTypes";
import info from "../apiKey.json";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    //esero tener un token y pasarlo al store
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const setTimeLogout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        //acá llamré al backend y devolveré el token con authSuccess
        dispatch(authStart());
        const apiKey = info.apiKey;
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        axios
            .post(url + apiKey, data)
            .then((resp) => {
                const expireDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
                //const expireDate = new Date(new Date().getTime() + 10 * 1000);
                localStorage.setItem("token", resp.data.idToken);
                localStorage.setItem("userId", resp.data.localId);
                localStorage.setItem("expireDate", expireDate);
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(setTimeLogout(resp.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error));
            });
    };
};

export const autoLog = (token, userId, expireDate) => {
    console.log(
        "This session will expire in: " + (new Date(expireDate) - new Date(new Date().getTime())) / 1000 + "seconds"
    );
    return (dispatch) => {
        if (new Date(expireDate) > new Date(new Date().getTime())) {
            dispatch(authStart());
            dispatch(authSuccess(token, userId));
            dispatch(setTimeLogout((new Date(expireDate) - new Date(new Date().getTime())) / 1000));
        } else {
            dispatch(authLogout());
        }
    };
};
