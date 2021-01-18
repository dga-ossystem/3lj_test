import axios from "axios";

export const createAPI = (baseCurr, callback) => {
    const api = axios.create({
        baseURL: `https://api.exchangeratesapi.io/latest?base=${baseCurr}`,
        timeout: 5000,
    });

    const onSuccess = (response) => {
        callback(response.data.rates);
        return response.data;
    };

    const onFail = (err) => {
        const {response} = err;

        if (response.status === 401) {
            throw err;
        }

        throw err;
    };

    api.interceptors.response.use(onSuccess, onFail);

    return api;
};

