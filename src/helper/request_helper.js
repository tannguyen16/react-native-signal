import axios from 'axios';

//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export function GetRequest() {
    return axios.get(`https://jsonplaceholder.typicode.com/users/`);
};
