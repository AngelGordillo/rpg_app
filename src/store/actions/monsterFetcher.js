import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const monsterFetchStart = () => {
    return {
        type: actionTypes.MONSTER_FETCH_START
    }
}

export const monsterFetchFail = (error) => {
    return {
        type: actionTypes.MONSTER_FETCH_FAIL,
        error: error
    }
}

export const monsterFetchSuccess = (monsterData) => {
    return {
        type: actionTypes.MONSTER_FETCH_SUCCESS,
        monsterData: monsterData
    }
}

export const monsterFetchData = () => {
    return dispatch => {
        dispatch(monsterFetchStart());
        axios.get('/monsters.json')
        .then(res => {
            const fetchedMonsters = [];
            for (let key in res.data) {
                fetchedMonsters.push({
                    ...res.data[key],
                    id: key
                });
            } 
            dispatch(monsterFetchSuccess(fetchedMonsters));
        })
            .catch(err => {
                console.log(err);
            })

    }
}