import { combineReducers } from 'redux';
import products from './products';

const rootReducer = history =>
    combineReducers({
        products
    });

export default rootReducer;
