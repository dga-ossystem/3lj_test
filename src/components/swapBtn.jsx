import React from "react";
import {IconButton} from '@material-ui/core';
import {useStyles} from '../styles.js';
import SwapIcon from '@material-ui/icons/Cached';


const SwapBtn = (props) => {
    const classes = useStyles();
    const {onBtnClick} = props;

    const animateSwapping = (target) => {
        target.classList.add(classes.rotateAnimation);

        setTimeout(() => {
            target.classList.remove(classes.rotateAnimation);
        }, 300);
    };

    return (
        <IconButton
            aria-label="swap"
            className={classes.swapBtn}
            onClick={(event) => {
                event.preventDefault();
                animateSwapping(event.currentTarget);
                onBtnClick();
            }}
        >
            <SwapIcon/>
        </IconButton>
    );
};

export default SwapBtn;
