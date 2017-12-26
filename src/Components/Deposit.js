import React, { Component } from 'react';
import { depositPaymentRequest } from "./../payments";

class Deposit extends Component {
    pay(){
        if (window.PaymentRequest) {
            depositPaymentRequest(1000);
        } else {
            alert('not implemented');
        }
    }
    render() {
        return <div>
            <h4>Deposit money</h4>
            <label htmlFor="deposit_amount">Amount:
                <input id="deposit_amount" name="deposit_amount" defaultValue="1000" type="number" min="30.00" step="0.01"/>
            </label>
            <br />
            <button onClick={this.pay.bind(this)}>Pay with card</button>
        </div>
    }
}

export default Deposit;