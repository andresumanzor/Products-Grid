import { combineReducers } from 'redux';
import products from './products';
import ad from './ad';

const rootReducer = history =>
    combineReducers({
        products,
        ad
    });

export default rootReducer;
