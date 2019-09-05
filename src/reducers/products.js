import Types from '../actions/types';

const initialState = {
  products: null,
  fetchingProducts: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PRODUCTS_DATA:
      if (action.payload) {
        return {
          ...state
        };
      } else return { ...state };
    case 'PRODUCTS_DATA_PENDING':
      return {
        ...state,
        fetchingProducts: true,
        products: null
      };
    case 'PRODUCTS_DATA_FULFILLED':
        return {
          ...state,
          products: action.payload.products
        };
    case 'PRODUCTS_DATA_REJECTED':
      return {
        ...state,
        products: []
      };
  }
  return state;
};
