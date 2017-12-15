import React, { Component } from 'react';
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

class Settings extends Component {
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
                window.alert(alertText);
            });
    }
    render() {
        return <div>
            <button onClick={this.updateUser.bind(this)}>Update user from google</button>
        </div>
    }
}

export default Settings;