import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants.js';

export function productListReducer(initialState = { products: [] }, action) {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };

		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };

		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return initialState;
	}
}

export function productDetailsReducer(initialState = { product: { reviews: [] } }, action) {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...initialState };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return initialState;
	}
}
