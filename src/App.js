import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { signOut } from "./auth";
import { getUsers } from "./users";
import Accounts from "./TableViews/Accounts";

class App extends Component {
  signOut(){
    signOut();
  }
  getUsers(){
    getUsers(users => {
      console.log(users);
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <br />
        <button onClick={this.signOut.bind(this)}>Sign out</button>
        <br />
        <button onClick={this.getUsers.bind(this)}>Get Users</button>
        <br />
        <Accounts />
      </div>
    );
  }
}

export default App;
