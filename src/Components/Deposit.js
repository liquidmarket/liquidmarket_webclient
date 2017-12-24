import React, { Component } from 'react';

class Deposit extends Component {
    pay(){
        alert('not implemented');
    }
    render() {
        return <div>
            <h4>Deposit money</h4>
            <label htmlFor="amount">Amount:
                <input name="amount" defaultValue="1000" type="number" min="30.00" step="0.01"/>
            </label>
            <br />
            <button onClick={this.pay.bind(this)}>Pay with card</button>
        </div>
    }
}

export default Deposit;