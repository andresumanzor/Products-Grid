import Types from '../actions/types';

const initialState = {
  data: null,
  beingFetched: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PRODUCTS_DATA:
      if (action.payload) {
        return {
          ...state
        };
      } else return { ...state };
    case 'FETCH_PRODUCTS_DATA_PENDING':
      return {
        ...state,
        beingFetched: true,
        data: null
      };
    case 'FETCH_PRODUCTS_DATA_FULFILLED':
        return {
          ...state,
          beingFetched: false,
          data: action.payload.data
        };
    case 'FETCH_PRODUCTS_DATA_REJECTED':
      return {
        ...state,
        beingFetched: false,
        data: []
      };
  }
  return state;
};
