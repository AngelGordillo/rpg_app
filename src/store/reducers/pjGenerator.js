import * as actionTypes from '../actions/actionTypes';

const intialState = {
    pj: [],
    loading: false,
    success: false
}
export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.PJ_CREATION_START:
            return { ...state, loading: true, success: false };
        case actionTypes.PJ_CREATION_FAIL:
            return { ...state, loading: false, success:false };
        case actionTypes.PJ_CREATION_SUCCESS:
            return { ...state, loading: false, success: true };
        default: return state
    }
}

export default reducer;