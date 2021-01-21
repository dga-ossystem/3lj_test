import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from '@material-ui/core';
import {useStyles} from '../styles.js';
import {ActionCreator} from "../store/action";


const TextInput = (props) => {
    const {onAmountChanged} = props;
    const classes = useStyles();
    const [isValid, setIsValid] = useState(true);
    const amount = useSelector(state => state.choosenCurrencies.amount);
    const dispatch = useDispatch();

    const inputChangeHandler = (event) => {
        let value = event.target.value.replace(/^0(?=(\d))/, '$&.').replace(/[a-zA-Zа-яА-Я]/g, '');
        setIsValid(+value > 0);
        isValid && dispatch(ActionCreator.setAmount(value));
        isValid && onAmountChanged();
    };

    return (
        <TextField
            error={!isValid}
            helperText={!isValid && 'The number must be greater that 0'}
            className={classes.input}
            label='Amount'
            value={amount}
            onChange={inputChangeHandler}
        />
    );
};

export default TextInput;
