import React from "react";
import {Typography} from '@material-ui/core';

const RateResponseElement = (props) => {
    const {choosenCurrencies, rates} = props;
    const targetRate = rates[choosenCurrencies.targetCurr];
    const targetAmount = (choosenCurrencies.amount * targetRate).toFixed(2);

    return (
            <div>
                <hr/>
                <Typography variant="subtitle1" component="p">
                    {`${choosenCurrencies.amount} ${choosenCurrencies.baseCurr} = ${targetAmount} ${choosenCurrencies.targetCurr} (${targetRate})`}
                </Typography>
            </div>
    );
};

export default RateResponseElement;
