import * as actionTypes from '../actions/actionTypes';

const intialState = {
    monstersData: [],
    loading: false
}
export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.MONSTER_FETCH_START:
            return { ...state, loading: true };
        case actionTypes.MONSTER_FETCH_FAIL:
            return { ...state, loading: false };
        case actionTypes.MONSTER_FETCH_SUCCESS:
            return {
                ...state,
                monsterData: action.monsterData,
                loading: false
            };
        default: return state
    }
}

export default reducer;