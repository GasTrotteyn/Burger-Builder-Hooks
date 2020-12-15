import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredient = (ing) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ing,
    };
};

export const removeIngredient = (ing) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ing,
    };
};

export const setIngerdients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const showErrorFetchingIngredients = () => {
    return {
        type: actionTypes.SHOW_ERROR_FETCHING_INGREDIENTS,
    };
};

export const fetchIngredients = () => {
    return (dispatch) => {
        axios
            .get(
                "https://react-my-burger-c7907.firebaseio.com/ingredients.json"
            )
            .then((resp) => {
                dispatch(setIngerdients(resp.data));
            })
            .catch((error) => {
                dispatch(showErrorFetchingIngredients());
            });
    };
};
