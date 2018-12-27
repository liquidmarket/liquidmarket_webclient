import React, { Component } from 'react';
import { depositPaymentRequest } from "./../payments";
import accountStore from "./../Stores/AccountStore";
import { deposit } from "./../Actions/Actions";

class Deposit extends Component {
    constructor(props){
        super(props);
        this.state = {
            account_id: null,
            desposit_amount: 30
        }
    }
    pay(){
        if (window.PaymentRequest) {
            depositPaymentRequest(1000);
        } else {
            if(this.state.account_id && this.state.desposit_amount){
                deposit(this.state.account_id, Number(this.state.desposit_amount));
            }
        }
    }
    handleAmountChanged(event){
        this.setState({desposit_amount: event.target.value});
    }
    handleAccountIdChanged(event){
        this.setState({account_id: event.target.value});
    }
    render() {
        const accounts = accountStore.accounts.map(a => <option key={a.id} value={a.id}>{ a.nameAndPrice }</option>);
        return <div>
            <h4>Deposit money</h4>
            <label htmlFor="deposit_amount">Amount:
                <input id="deposit_amount" name="deposit_amount" onChange={this.handleAmountChanged.bind(this)} value={this.state.desposit_amount} type="number" min="30.00" step="5"/>
            </label>
            <label htmlFor="account">Account:
                <select name="account" onChange={this.handleAccountIdChanged.bind(this)}>
                    { accounts }
                </select>
            </label>
            <br />
            <button onClick={this.pay.bind(this)}>Pay with card</button>
        </div>
    }
}

export default Deposit;