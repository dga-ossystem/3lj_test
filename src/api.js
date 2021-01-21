import axios from "axios";

export const createAPI = () => {
    const api = axios.create({
        baseURL: 'https://api.exchangeratesapi.io/',
        timeout: 5000,
    });

    // const onSuccess = (response) => {
    //     return response;
    // };
    //
    // const onFail = (err) => {
    //     const {response} = err;
    //
    //     if (response.status === 401) {
    //         throw err;
    //     }
    //
    //     throw err;
    // };
    //
    // api.interceptors.response.use(onSuccess, onFail);

    return api;
};

