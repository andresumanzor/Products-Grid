import Types from './types';
import axios from 'axios';

export const fetchProducts = (page, sortBy = '') => {
    return dispatch => {
        dispatch({ 
            type: Types.FETCH_PRODUCTS_DATA,
            payload: axios.get(`http://localhost:3000/products?_page=${page}&_limit=20&_sort=${sortBy}`)  
        }),
        dispatch({ 
            type: Types.FETCH_NEXT_PRODUCTS_DATA,
            payload: axios.get(`http://localhost:3000/products?_page=${page + 1}&_limit=20&_sort=${sortBy}`)  
        })
        dispatch({ 
            type: Types.UPDATE_NEXT_DATA_PAGE,
            payload: { nextDataPage: page + 1 }
        })
    }
}

export const updateProducts = (page, sortBy = '', data) => {
    return dispatch => {
        dispatch({ 
            type: Types.UPDATE_PRODUCTS_DATA,
            payload: { data }
        }),
        dispatch({ 
            type: Types.FETCH_NEXT_PRODUCTS_DATA,
            payload: axios.get(`http://localhost:3000/products?_page=${page + 1}&_limit=20&_sort=${sortBy}`)  
        }),
        dispatch({ 
            type: Types.UPDATE_NEXT_DATA_PAGE,
            payload: { nextDataPage: page + 1 }
        })
    }
}