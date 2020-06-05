import * as actionTypes from '../actions/actionTypes';

const intialState = {
    pjsData: [],
    loading: false
}
export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.PJ_FETCH_START:
            return { ...state, loading: true };
        case actionTypes.PJ_FETCH_FAIL:
            return { ...state, loading: false };
        case actionTypes.PJ_FETCH_SUCCESS:
            return {
                ...state,
                pjData: action.pjData,
                loading: false
            };
        default: return state
    }
}

export default reducer;