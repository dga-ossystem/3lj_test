import axios from "axios";

export const createAPI = () => {
    const api = axios.create({
        baseURL: 'https://api.exchangeratesapi.io/',
        timeout: 5000,
    });

    return api;
};

