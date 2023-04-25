import axios from "axios";

const REACT_APP_API_URL = "http://localhost:5000"

function signIn(body) {
    const promise = axios.post(`${REACT_APP_API_URL}/sign-in`, body);
    return promise;
};

function signUp(body) {
    const promise = axios.post(`${REACT_APP_API_URL}/cadastro`, body);
    return promise;
};

function createConfig(token){
    return{
        headers: {
            Authorization: `Bearer ${token}`
        }
}
}

function pullTransaction(token){
    const promise = axios.get(`${REACT_APP_API_URL}/home`, createConfig(token));
    return promise;
}

function createTransaction(token, body, type){
    const promise = axios.post(`${REACT_APP_API_URL}/transactions/${type}`, body, createConfig(token));
    return promise;
}

const api = {
    signIn,
    signUp,
    pullTransaction,
    createTransaction
};

export default api;