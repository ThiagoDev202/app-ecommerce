import axios from 'axios';
import { returnErrros } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

// getCart - fetch the cart for any user
export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/api/cart/${id}`)
    .then(res => dispatch({
        type: GET_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrros(err.response.data, err.response.status)));
}

// addToCart - add an item to the cart (by user's id), pass the productId and the quantity as the request body
export const addToCart = (id, productId, quantiy) => dispatch => {
    axios.post(`/api/cart/${id}`, {productId, quantiy})
    .then(res => dispatch({
        type: ADD_TO_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// deleteFromCart - by itemId and user's Id
export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart${userId}/${itemId}`)
    .then(res => dispatch({
        type: DELETE_FROM_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return{
        type: CART_LOADING
    }
}