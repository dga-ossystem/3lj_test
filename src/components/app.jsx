import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import {
    Container,
    Card,
    Select,
    MenuItem,
    TextField,
    IconButton,
    LinearProgress,
    Typography,
} from '@material-ui/core';
import SwapIcon from '@material-ui/icons/Cached';
import {Currency} from '../const.js';
import {useStyles, theme} from '../styles.js';
import {createAPI} from "../api.js";


const App = () => {
    const classes = useStyles();

    const [baseCurr, setBaseCurr] = useState(Currency.USD);
    const [targetCurr, setTargetCurr] = useState(Currency.EUR);
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const setRates = (data) => {
        setRate({
            'exchange_rate': data[targetCurr],
            'currency_code': targetCurr,
            'amount': (amount * data[targetCurr]).toFixed(2),
        });

        setTimeout(() => {setIsFetching(false)}, 1000);
    };

    useEffect(() => {
        isValid && createAPI(baseCurr, setRates)();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseCurr, targetCurr, amount]);

    const baseCurrChangeHandler = (event) => {
        setBaseCurr(event.target.value);
    };

    const targetCurrChangeHandler = (event) => {
        setTargetCurr(event.target.value);
    };

    const inputChangeHandler = (event) => {
        setIsFetching(true);
        let value = event.target.value.replace(/^0(?=(\d))/, '$&.').replace(/[a-zA-Zа-яА-Я]/g, '');
        setAmount(value);
        setIsValid(+value > 0);
    };

    const swapCurrencies = () => {
        setBaseCurr(targetCurr);
        setTargetCurr(baseCurr);
    };

    const animateSwapping = (target) => {
        target.classList.add(classes.rotateAnimation);

        setTimeout(() => {
            target.classList.remove(classes.rotateAnimation);
        }, 300);
    };

    return (
        <ThemeProvider theme={theme}>
        <Container className={classes.pageWrapper}>

            <Card className={classes.widgetCard}>
                {isFetching && <LinearProgress className={classes.loader} />}


                <div className={classes.inputContainer}>
                    <TextField
                        error={!isValid}
                        helperText={!isValid && 'The number must be greater that 0'}
                        className={classes.input}
                        label='Amount'
                        value={amount}
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className={classes.currContainer}>
                    <div className={classes.inputContainer}>
                        <Select
                            className={classes.input}
                            value={baseCurr}
                            onChange={baseCurrChangeHandler}
                        >
                            <MenuItem
                                value={Currency.EUR}
                                disabled={Currency.EUR === targetCurr}
                            >
                                {Currency.EUR}
                            </MenuItem>
                            <MenuItem
                                value={Currency.USD}
                                disabled={Currency.USD === targetCurr}
                            >
                                {Currency.USD}
                            </MenuItem>
                            <MenuItem
                                value={Currency.ILS}
                                disabled={Currency.ILS === targetCurr}
                            >
                                {Currency.ILS}
                            </MenuItem>
                        </Select>
                    </div>

                    <IconButton
                        aria-label="swap"
                        className={classes.swapBtn}
                        onClick={(event) => {
                            event.preventDefault();
                            animateSwapping(event.currentTarget);
                            swapCurrencies();
                        }}
                    >
                        <SwapIcon/>
                    </IconButton>

                    <div className={classes.inputContainer}>
                        <Select
                            className={classes.input}
                            value={targetCurr}
                            onChange={targetCurrChangeHandler}
                        >
                            <MenuItem
                                value={Currency.EUR}
                                disabled={Currency.EUR === baseCurr}
                            >
                                {Currency.EUR}
                            </MenuItem>
                            <MenuItem
                                value={Currency.USD}
                                disabled={Currency.USD === baseCurr}
                            >
                                {Currency.USD}
                            </MenuItem>
                            <MenuItem
                                value={Currency.ILS}
                                disabled={Currency.ILS === baseCurr}
                            >
                                {Currency.ILS}
                            </MenuItem>
                        </Select>
                    </div>
                </div>

                {
                    (Object.keys(rate).length !== 0 && isValid && amount !== '' && !isFetching) && (
                        <div>
                            <hr/>
                            <Typography variant="subtitle1" component="p">
                                {`${amount} ${baseCurr} = ${rate.amount} ${rate.currency_code} (${rate.exchange_rate})`}
                            </Typography>
                        </div>
                    )
                }

            </Card>
        </Container>
        </ThemeProvider>
    );
};

export default App;
