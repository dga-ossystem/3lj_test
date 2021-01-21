import React from "react";
import {useSelector, useDispatch } from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles';
import {
    Container,
    Card,
    LinearProgress,
    Typography,
} from '@material-ui/core';
import {Currency, CurrType, CACHE_TTL} from '../const.js';
import {useStyles, theme} from '../styles.js';
import {ActionCreator, Operation} from "../store/action.js";
import CurrSelect from "./currSelect.jsx";
import TextInput from "./textInput.jsx";
import SwapBtn from "./swapBtn.jsx";
import RateResponseElement from "./rateResponseElement.jsx";
import withCurrSelect from "../hocs/with-curr-select.js";
const WrappedCurrSelect = withCurrSelect(CurrSelect);


const App = () => {
    const classes = useStyles();
    const choosenCurrencies = useSelector(state => state.choosenCurrencies);
    const loadedRates = useSelector(state => state.loadedRates.rates);
    const isFetching = useSelector(state => state.isFetching);
    const requestTime = useSelector(state => state.requestTime);
    const isError = useSelector(state => state.requestError);
    const dispatch = useDispatch();

    const getRates = () => {
        const now = new Date().getTime();
        (now - requestTime) > CACHE_TTL && dispatch(Operation.loadRates(choosenCurrencies.baseCurr));
    };

    const swapCurrencies = () => {
        dispatch(Operation.loadRates(choosenCurrencies.targetCurr));
        dispatch(ActionCreator.swapCurrencies(choosenCurrencies));
    };

    return (
        <ThemeProvider theme={theme}>
        <Container className={classes.pageWrapper}>

            <Card className={classes.widgetCard}>
                {isFetching && <LinearProgress className={classes.loader} />}


                <div className={classes.inputContainer}>
                    <TextInput
                    onAmountChanged={getRates}
                    />
                </div>

                <div className={classes.currContainer}>
                    <div className={classes.inputContainer}>
                        <WrappedCurrSelect
                            values={Currency}
                            currType={CurrType.BASE}
                            disabledValue={choosenCurrencies.targetCurr}
                        />
                    </div>

                    <SwapBtn
                        onBtnClick={swapCurrencies}
                    />

                    <div className={classes.inputContainer}>
                        <WrappedCurrSelect
                            values={Currency}
                            currType={CurrType.TARGET}
                            disabledValue={choosenCurrencies.baseCurr}
                        />
                    </div>
                </div>

                {
                    (loadedRates && Object.keys(loadedRates).length !== 0 && !isFetching && !isError) && (
                        <RateResponseElement
                            choosenCurrencies={choosenCurrencies}
                            rates={loadedRates}
                        />
                    )
                }

                {
                    isError && (
                        <div>
                            <hr/>
                            <Typography variant="subtitle2" component="p" style={{color: 'red'}}>Something went wrong... <br/>Please try again later</Typography>
                        </div>
                    )
                }

            </Card>
        </Container>
        </ThemeProvider>
    );
};

export default App;
