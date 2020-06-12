import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as monsterGeneratorBack from '../../backend/monsterGenerator';
export const monsterGeneratorStart = () => {
    return {
        type: actionTypes.MONSTER_CREATION_START
    }
}

export const monsterGeneratorFail = (error) => {
    return {
        type: actionTypes.MONSTER_CREATION_FAIL,
        error: error
    }
}

export const monsterInit = () => {
    return {
        type: actionTypes.MONSTER_INIT,
    }
}
export const monsterGeneratorSuccess = (id, monsterData) => {
    return {
        type: actionTypes.MONSTER_CREATION_SUCCESS,
        monsterData: monsterData,
        monsterId: id,
    }
}

export const monsterGenerator = (monsterData) => {
    return dispatch => {
        dispatch(monsterGeneratorStart());
        const generatedMonster = monsterGeneratorBack.generateMonster(monsterData);
        axios.post('/monsters.json', generatedMonster, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(response => {
                console.log(generatedMonster)
                dispatch(monsterGeneratorSuccess(response.data.name, generatedMonster));
            })
            .catch(err => {
                dispatch(monsterGeneratorFail(err));
                console.log(err);
            })
    }
}