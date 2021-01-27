import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants.js';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	const product = data.data.product;

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: product._id,
			name: product.name,
			cover: product.cover,
			price: product.price,
			countInStock: product.countInStock,
			quantity,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
	console.log('action');

	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
