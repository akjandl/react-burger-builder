import axios from '../../axios-orders';
import * as actn from './actionTypes';

export const addIngredient = (ingredientName) => {
  return {
    type: actn.ADD_INGREDIENT,
   ingredientName: ingredientName
  }
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actn.REMOVE_INGREDIENT,
    ingredientName: ingredientName
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actn.SET_INGREDIENTS,
    ingredients: ingredients
  }
};

export const fetchIngredientsFailed = () => {
  return {
    type: actn.FETCH_INGREDIENTS_FAILED
  }
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      });
  }
};