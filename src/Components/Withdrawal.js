import React, { Component } from 'react';

class Withdrawal extends Component {
    withdraw() {
        alert('not implemented');
    }
    render() {
        return <div>
            <h4>Withdraw money</h4>
            <label htmlFor="amount">Amount:
                <input name="amount" defaultValue="1000" type="number" min="30.00" step="0.01"/>
            </label>
            <label htmlFor="account_number">Account number:
                <input style={{ width: '2em' }} type="text" defaultValue="00"/> - <input style={{ width: '3em' }} type="text" defaultValue="0000"/> - <input style={{ width: '5em' }} type="text" defaultValue="0000000"/> - <input style={{ width: '2em' }} type="text" defaultValue="00"/>
            </label>
            <button onClick={this.withdraw.bind(this)}>Withdraw</button>
        </div>
    }
}

export default Withdrawal;