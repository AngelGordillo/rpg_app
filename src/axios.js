import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rol-app-test.firebaseio.com/'
});

export default instance;