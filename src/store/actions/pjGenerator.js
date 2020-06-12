import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as pjGeneratorBack from '../../backend/pjGenerator';

export const pjInit = () => {
    return {
        type: actionTypes.PJ_INIT,
    }
}
export const pjGeneratorStart = () => {
    return {
        type: actionTypes.PJ_CREATION_START
    }
}

export const pjGeneratorFail = (error) => {
    return {
        type: actionTypes.PJ_CREATION_FAIL,
        error: error
    }
}

export const pjGeneratorSuccess = (id, pjData) => {
    return {
        type: actionTypes.PJ_CREATION_SUCCESS,
        pjData: pjData,
        pjId: id,
    }
}

export const pjGenerator = (pjData) => {
    return dispatch => {
        dispatch(pjGeneratorStart());
        console.log(pjData)
        const generatedPj = pjGeneratorBack.generatePj(pjData);
        axios.post('/pjs.json', generatedPj, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(response => {
                console.log(generatedPj)
                dispatch(pjGeneratorSuccess(response.data.name, generatedPj));
            })
            .catch(err => {
                dispatch(pjGeneratorFail(err));
                console.log(err);
            })
    }
}