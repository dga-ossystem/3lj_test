import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {ActionCreator, Operation} from "../store/action.js";
import {CurrType} from '../const.js';

const withCurrSelect = (Component) => {
    class WithCurrSelect extends PureComponent {
        constructor(props) {
            super(props);

            this._valueChangeHandler = this._valueChangeHandler.bind(this);
        }

        _valueChangeHandler(evt) {
            const {
                currType,
                choosenCurrencies,
                setChoosenCurrencies,
                loadCurrencies,
            } = this.props;
            const newCurrencies = Object.assign({}, choosenCurrencies, {
                [currType]: evt.target.value,
            });

            setChoosenCurrencies(newCurrencies);
            if (currType === CurrType.BASE) {
                loadCurrencies(evt.target.value);
            }
        }

        render() {
            const {currType, choosenCurrencies} = this.props;
            return (
                <Component
                    {...this.props}
                    currName={choosenCurrencies[currType]}
                    onValueChange={this._valueChangeHandler}
                />
            );
        }
    }

    const mapStateToProps = (state) => ({
        choosenCurrencies: state.choosenCurrencies,
    });

    const mapDispatchToProps = (dispatch) => ({
        setChoosenCurrencies(newCurrencies) {
            dispatch(ActionCreator.setChoosenCurrencies(newCurrencies));
        },

        loadCurrencies(baseCurr) {dispatch(Operation.loadRates(baseCurr))}
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithCurrSelect);
};

export {withCurrSelect};
export default withCurrSelect;
