import React, { Component } from 'react';
import accountStore from "./../Stores/AccountStore";
import { withdrawal } from "./../Actions/Actions";

class Withdrawal extends Component {
    constructor(props){
        super(props);
        this.state = {
            account_id: null,
            desposit_amount: 30
        }
    }
    withdraw() {
        if(this.state.account_id && this.state.desposit_amount){
            withdrawal(this.state.account_id, Number(this.state.desposit_amount));
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
            <h4>Withdraw money</h4>
            <label htmlFor="amount">Amount:
                <input name="amount" onChange={this.handleAmountChanged.bind(this)} defaultValue="1000" type="number" min="30.00" step="0.01"/>
            </label>
            <label htmlFor="account_number">Account number:
                <input style={{ width: '2em' }} type="text" defaultValue="00"/> - <input style={{ width: '3em' }} type="text" defaultValue="0000"/> - <input style={{ width: '5em' }} type="text" defaultValue="0000000"/> - <input style={{ width: '2em' }} type="text" defaultValue="00"/>
            </label>
            <label htmlFor="account">Account:
                <select name="account" onChange={this.handleAccountIdChanged.bind(this)}>
                    { accounts }
                </select>
            </label>
            <button onClick={this.withdraw.bind(this)}>Withdraw</button>
        </div>
    }
}

export default Withdrawal;