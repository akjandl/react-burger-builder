import * as actn from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actn.PURCHASE_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actn.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actn.PURCHASE_BURGER_START
  }
};

export const purchaseInit = () => {
  return {
    type: actn.PURCHASE_INIT
  }
};

export const purchaseBurger = (orderData) => {
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    const token = getState().auth.token;
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log('[ORDER RESPONSE]', response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  }
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actn.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actn.FETCH_ORDERS_FAILED,
    error: error
  }
};

export const fetchOrderStart = () => {
  return {
    type: actn.FETCH_ORDERS_START
  }
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(resp => {
        console.log('[ORDERS RESPONSE]', resp.data);
        const ordersData = [];
        for (let key in resp.data) {
          ordersData.push({...resp.data[key], id: key});
        }
        dispatch(fetchOrdersSuccess(ordersData));
      })
      .catch(error => {
        dispatch(fetchOrdersFailed(error));
      });
  }
};
