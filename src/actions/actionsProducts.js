import Types from './types';
import axios from 'axios';

export const fetchProducts = (page) => {
    return dispatch => {
        return dispatch({ 
            type: Types.FETCH_PRODUCTS_DATA,
            payload: axios.get(`/api/products?_page=${page}&_limit=20`)  
        });
    }
}