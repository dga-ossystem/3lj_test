import {Currency} from '../const.js';
import {ActionType} from "./action.js";

const initialState = {
    choosenCurrencies: {
        amount: '',
        baseCurr: Currency.USD,
        targetCurr: Currency.EUR,
    },
    loadedRates: [],
    isFetching: false,
    requestTime: '',
    requestError: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LOAD_RATES:
            return {
                ...state,
                loadedRates: action.payload,
                isFetching: false,
                requestTime: new Date().getTime(),
            };

        case ActionType.SWAP_CURRENCIES:
            return {
                ...state,
                choosenCurrencies: {
                ...state.choosenCurrencies,
                    baseCurr: action.payload.targetCurr,
                    targetCurr: action.payload.baseCurr,
                },
            };

        case ActionType.SET_CHOOSEN_CURRENCIES:
            return {
                ...state,
                choosenCurrencies: {
                    amount: action.payload.amount,
                    baseCurr: action.payload.baseCurr,
                    targetCurr: action.payload.targetCurr,
                },
            };

        case ActionType.SET_AMOUNT:
            return  {...state, choosenCurrencies: {...state.choosenCurrencies, amount: action.payload}}

        case ActionType.SET_IS_FETCHING:
            return  {...state, isFetching: action.payload}

        case ActionType.SET_ERROR:
            return {...state, isFetching: false, requestError: true,};
    }
    return state;
};


export {reducer};
