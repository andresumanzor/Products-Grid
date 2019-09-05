import Types from './types';
import axios from 'axios';

export function fetchProducts(page) {
    return dispatch => {
        return dispatch({ 
            type: Types.FETCH_PRODUCTS,
            payload: axios.get(`/api/products?_page=${page}&_limit=20`)  
        });
    }
}