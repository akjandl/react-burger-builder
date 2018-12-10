import * as actn from '../actions/actionTypes';
import { updateObject } from "../utility";

const defaultState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  // using the updateObject utility function
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  // personally, this seems easier to read
  // basically the same logic as the ADD_INGREDIENT case
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: action.ingredients,
    totalPrice: defaultState.totalPrice,
    error: false,
    building: false
  };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actn.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actn.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actn.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actn.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true});

    default:
      return state;
  }
};

export default reducer;