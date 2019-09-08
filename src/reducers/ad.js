import Types from '../actions/types';

const initialState = {
  current: -1,
  rest: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_AD:
      return {
        ...state,
        current: action.payload.newAd,
        rest: [...state.rest, action.payload.newAd]
      };
  }
  return state;
};
