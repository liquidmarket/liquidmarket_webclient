import React, { Component } from 'react';
import accountStore from "./../Stores/AccountStore";
import { updateAccount, createAccount, refreshAccounts, deleteAccount } from "./../Actions/AccountActions";
import './Tables.css';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: accountStore.getAll()
        }
    }
    componentWillMount(){
        accountStore.on("change", () => {
            this.setState({ accounts: accountStore.getAll() });
        });
        refreshAccounts();
    }
    addAccount(){
        let name = prompt('name of acccount', 'great account name');
        createAccount(name);
    }
    render(){
        if (this.state.accounts.length === 0) {
            return <div>
                <p>No accounts loaded</p>
                <br/>
                <button onClick={this.addAccount.bind(this)}>Add</button>
            </div>
        } else {
            return (
                    <div>
                        <AccountsTable accounts={this.state.accounts} />
                        <br/>
                        <button onClick={this.addAccount.bind(this)}>Add</button>
                    </div>
                )
        }
    }
}

function AccountsTable(props) {
    let tableRecords = props.accounts.map(a => <AccountRecord key={a.id} account={a} />);
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { tableRecords }
            </tbody>
        </table>
    )
}

class AccountRecord extends Component{
    update(){
        let newName = prompt('New name:', this.props.account.name);
        updateAccount(this.props.account.id, newName);
    }
    delete(){
        let deletionConfirmed = window.confirm(`Are you sure you want to delete: ${this.props.account.name}`);
        if (deletionConfirmed) {
            deleteAccount(this.props.account.id);
        }
    }
    render(){
        let a = this.props.account;
        return <tr>
                <td>{ a.id }</td>
                <td>{ a.name }</td>
                <td>{ a.balance }</td>
                <td><button onClick={this.update.bind(this)}>Update</button></td>
                <td><button onClick={this.delete.bind(this)}>Delete</button></td>
            </tr>
    }
}

export default Accounts;