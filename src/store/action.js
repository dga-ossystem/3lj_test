import {REQUEST_DELAY} from '../const.js';

const ActionType = {
    LOAD_RATES: 'LOAD_RATES',
    SWAP_CURRENCIES: 'SWAP_CURRENCIES',
    SET_CHOOSEN_CURRENCIES: 'SET_CHOOSEN_CURRENCIES',
    SET_AMOUNT: 'SET_AMOUNT',
    SET_IS_FETCHING: 'SET_IS_FETCHING',
    SET_ERROR: 'SET_ERROR',
};

const ActionCreator = {
    loadRates: (rates) => ({
        type: ActionType.LOAD_RATES,
        payload: rates,
    }),

    swapCurrencies: (currencies) => ({
        type: ActionType.SWAP_CURRENCIES,
        payload: currencies,
    }),

    setChoosenCurrencies: (newCurrencies) => ({
        type: ActionType.SET_CHOOSEN_CURRENCIES,
        payload: newCurrencies,
    }),

    setAmount: (amount) => ({
        type: ActionType.SET_AMOUNT,
        payload: amount,
    }),

    setIsFetching: (status) => ({
        type: ActionType.SET_IS_FETCHING,
        payload: status,
    }),

    setError: () => ({
        type: ActionType.SET_ERROR,
    }),
};

const Operation = {
    loadRates: (baseCurr) => (dispatch, getState, api) => {
        dispatch(ActionCreator.setIsFetching(true));
        return api.get(`latest?base=${baseCurr}`)
            .then((response) => {
                setTimeout(() => {
                    dispatch(ActionCreator.loadRates(response.data));
                }, REQUEST_DELAY);
            })
            .catch(() => {
                dispatch(ActionCreator.setError());
            });
    },
};


export {
    ActionCreator,
    ActionType,
    Operation,
};
