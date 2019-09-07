import Types from '../actions/types';

const initialState = {
  data: null,
  beingFetched: false,
  nextData: null,
  nextDataPage: null,
  nextDataBeingFetched: false
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case 'FETCH_NEXT_PRODUCTS_DATA_PENDING':
      return {
        ...state,
        nextDataBeingFetched: true,
        nextData: null
      };
    case 'FETCH_NEXT_PRODUCTS_DATA_FULFILLED':
        return {
          ...state,
          nextDataBeingFetched: false,
          nextData: action.payload.data
        };
    case 'FETCH_NEXT_PRODUCTS_DATA_REJECTED':
      return {
        ...state,
        nextDataBeingFetched: false,
        nextData: []
      };
    case Types.UPDATE_PRODUCTS_DATA:
      return {
        ...state,
        data: action.payload.data
      };
    case Types.UPDATE_NEXT_DATA_PAGE:
      return {
        ...state,
        nextDataPage: action.payload.nextDataPage
      };
  }
  return state;
};
