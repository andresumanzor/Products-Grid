import Types from './types';

export const updateViewedAd = (ad) => {
    return dispatch => {
        return dispatch({ 
            type: Types.UPDATE_AD,
            payload: { newAd: ad }
        })
    }
}