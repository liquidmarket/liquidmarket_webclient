import React, { Component } from 'react';
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";
// import { refreshAddresses } from "./../Actions/AddressActions";
import Addresses from "./../TableViews/Addresses";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.fetchUser();
    }
    fetchUser(){
        let options = { 
            headers: getAuthorizationHeader(), 
            method: 'GET'
        };
        fetch(`${host}/users/${localStorage.getItem("user_id")}`, options)
            .then(res => res.json())
            .then(user => {
                this.setState({ user });
            });
    }
    updateUser() {
        let options = { 
            headers: getAuthorizationHeader(), 
            method: 'PUT'
        };
        fetch(`${host}/users`, options)
            .then(res => res.json())
            .then(user => {
                let alertText = `UPDATED USER:
                First Name: ${user.first_name}
                Last Name: ${user.last_name}
                Email: ${user.email}`;
                this.setState({ user });
                window.alert(alertText);
            });
    }
    render() {
        if (this.state.user) {
            return <div>
                <User user={this.state.user} updateUserFunc={this.updateUser.bind(this)}/>
                <hr />
                <Addresses />
            </div>
        } else {
            return <div>
                
            </div>
        }
    }
}

function User(props) {
    const { user, updateUserFunc } = props;
    return <div>
        <dl>
        <dt>First Name</dt>
        <dd>{ user.first_name }</dd>
        <dt>Last Name</dt>
        <dd>{ user.last_name }</dd>
        <dt>Email</dt>
        <dd>{ user.email }</dd>
        </dl>
        <button onClick={updateUserFunc}>Update from google account</button>
    </div>
}

export default Settings;