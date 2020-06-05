import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const pjFetchStart = () => {
    return {
        type: actionTypes.PJ_FETCH_START
    }
}

export const pjFetchFail = (error) => {
    return {
        type: actionTypes.PJ_FETCH_FAIL,
        error: error
    }
}

export const pjFetchSuccess = (pjData) => {
    return {
        type: actionTypes.PJ_FETCH_SUCCESS,
        pjData: pjData
    }
}

export const pjFetchData = () => {
    return dispatch => {
        dispatch(pjFetchStart());
        axios.get('/pjs.json')
        .then(res => {
            const fetchedPjs = [];
            for (let key in res.data) {
                fetchedPjs.push({
                    ...res.data[key],
                    id: key
                });
            } 
            dispatch(pjFetchSuccess(fetchedPjs));
        })
            .catch(err => {
                console.log(err);
            })

    }
}