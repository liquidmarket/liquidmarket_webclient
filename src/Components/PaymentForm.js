import React, { Component } from 'react';
import accountStore from "./../Stores/AccountStore";

export class PaymentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedAccountId: undefined,
            shares: 0
        }
    }
    handleAccount(event){
        this.setState({selectedAccountId: event.target.value}, () => this.updateOptions());
    }
    handleShares(event){
        this.setState({shares: event.target.value}, () => this.updateOptions());
    }
    get total(){
        return '$' + (this.state.shares * this.props.listing.buy_price).toLocaleString(undefined, {minimumFractionDigits: 2});
    }
    componentWillMount(){
        if (this.props.accounts.length > 0) {
            this.setState({
                selectedAccountId: this.props.accounts[0].id
            });
        }
        accountStore.on("change", () => {
            this.setState({ accounts: accountStore.getAll() });
        });
    }
    componentWillUnmount(){
        accountStore.removeAllListeners();
    }
    updateOptions() {
        this.props.updateOptions({
            account_id: this.state.selectedAccountId,
            shares_to_buy: this.state.shares
        });
    }
    render() {
        const accounts = this.props.accounts.map(a => <option key={a.id} value={a.id}>{ a.nameAndPrice }</option>);
        if (accounts.length === 0) {
            return(
                <p>Error</p>
            )
        } else if (accounts.length === 1) {
            return (
                <div>
                    <label htmlFor="shares_to_buy">Amount:
                        <input id="shares_to_buy" name="shares_to_buy" value={this.state.shares} onChange={this.handleShares.bind(this)} type="number" step="1"/>
                    </label>
                    <hr />
                    <span style={{ float: 'right' }}>{ this.total }</span>
                </div>
            )
        } else {
            return (
                <div>
                    <label htmlFor="shares_to_buy">Amount:
                        <input id="shares_to_buy" name="shares_to_buy" value={this.state.shares} onChange={this.handleShares.bind(this)} type="number" step="1"/>
                    </label>
                    <label htmlFor="account">Account:
                        <select name="account" value={this.state.selectedAccount} onChange={this.handleAccount.bind(this)}>
                            { accounts }
                        </select>
                    </label>            
                    <hr />
                    <span style={{ float: 'right' }}>{ this.total }</span>
                </div>
            )
        }
    }
}