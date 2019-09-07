import Types from '../actions/types';

const initialState = {
  current: -1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_AD:
      return {
        ...state,
        current: action.payload.newAd
      };
  }
  return state;
};
