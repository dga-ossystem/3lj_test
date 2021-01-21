import React from "react";
import {
    Select,
    MenuItem,
} from '@material-ui/core';
import {useStyles} from '../styles.js';


const CurrSelect = (props) => {
    const classes = useStyles();
    const {values, currType, currName, disabledValue, onValueChange} = props;

    return (
        <Select
            className={classes.input}
            value={currName}
            onChange={onValueChange}
        >
            {
                Object.values(values).map((value, i) => {
                    return (
                        <MenuItem
                            key={`${currType}-${i}-${value}`}
                            value={value}
                            disabled={value === disabledValue}
                        >
                            {value}
                        </MenuItem>
                    );
                })
            }

        </Select>
    );
};

export default CurrSelect;
