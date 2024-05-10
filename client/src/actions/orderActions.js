import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';

// getOrders - set the orders as loading, using the user's id
export const getOrders = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/order/${id}`)
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// checkout - place an order, it receives two parameters from the componentes, user's id and source's id (generated from stripe checkout functions)

export const checkout = (id, source) => dispatch => {
    axios.post(`/api/order/${id}`, {source})
    .then(res => dispatch({
        type: CHECKOUT,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}