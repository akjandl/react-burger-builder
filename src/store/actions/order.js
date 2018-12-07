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
    type: actn.FETCH_INGREDIENTS_FAILED,
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
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrderStart());
    axios.get('/orders.json')
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