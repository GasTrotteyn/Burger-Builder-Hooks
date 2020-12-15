import * as actionTypes from "../actions/actionsTypes";
import { updatedObject } from "../../shared/utillity";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    };
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    };
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updatedObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false,
    });
};

const showErrorFetchingIngredients = (state, action) => {
    return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.SHOW_ERROR_FETCHING_INGREDIENTS:
            return showErrorFetchingIngredients(state, action);
        default:
            return state;
    }
    //return state;
};

export default reducer;
