import * as actn from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
  orders: [], // array of order objects
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actn.PURCHASE_INIT:
      return updateObject(state, {purchased: false});

    case actn.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true});

    case actn.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, {id: action.orderId});
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };

    case actn.PURCHASE_BURGER_FAILED:
      return updateObject(state, {loading: false});

    case actn.FETCH_ORDERS_START:
      return updateObject(state, {loading: true});

    case actn.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {orders: action.orders, loading: false});

    case actn.FETCH_ORDERS_FAILED:
      return updateObject(state, {loading: false});

    default:
      return state;
  }
};

export default reducer;