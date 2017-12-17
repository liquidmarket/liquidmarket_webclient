const fs = require('fs');

// names of the model (assumes name is capitilized)
const name = process.argv[2];
const endpoint = `http://localhost:4000/${name.toLowerCase()}s`

console.log(endpoint);

function writeErrorFactory(fileName) {
    return err => {
        console.log('==' + fileName + '==');
        if (err) {
            console.log(err);
        } else {
            console.log('no errors found');
        }
        console.log('='.repeat(fileName.length + 4));
    }
}


const actionFileText = `import dispatcher from "./../dispatcher";
import Auth from "./../Auth/Auth";

const auth = new Auth();

export function refresh${name}s(){
    let headers = auth.getAuthorizationHeader();
    fetch('${endpoint}', { headers })
        .then(res => res.json())
        .then(${name.toLowerCase()}s => dispatcher.dispatch({
            type: 'REFRESH_${name.toUpperCase()}',
            ${name.toLowerCase()}s: ${name.toLowerCase()}s
        }));
}
`

const storeFileText = `import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";

class ${name}Store extends EventEmitter {
    constructor(){
        super();
        this.${name.toLowerCase()}s = [];
    }
    getAll() {
        return this.${name.toLowerCase()}s;
    }
    handleActions(action){
        switch (action.type) {
            case 'REFRESH_${name.toUpperCase()}':
                this.${name.toLowerCase()}s = action.${name.toLowerCase()}s;
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const ${name.toLowerCase()}Store = new ${name}Store();

dispatcher.register(${name.toLowerCase()}Store.handleActions.bind(${name.toLowerCase()}Store));

export default ${name.toLowerCase()}Store;
`

const tableViewFileText = `import React, { Component } from 'react';
import ${name.toLowerCase()}Store from "./../Stores/${name}Store";
import { refresh${name}s } from "./../Actions/${name}Actions";

class ${name}s extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ${name.toLowerCase()}s: ${name.toLowerCase()}Store.getAll()
        }
    }
    componentWillMount(){
        ${name.toLowerCase()}Store.on("change", () => {
            this.setState({ ${name.toLowerCase()}s: ${name.toLowerCase()}Store.getAll() });
        });
        refresh${name}s();
    }
    componentWillUnmount(){
        ${name.toLowerCase()}Store.removeAllListeners();
    }
    render(){
        return <p>{ JSON.stringify(this.state.${name.toLowerCase()}s) }</p>
    }
}

export default ${name}s;
`



fs.writeFile(`src/Actions/${name}Actions.js`, actionFileText, writeErrorFactory(`${name}Action`));
fs.writeFile(`src/Stores/${name}Store.js`, storeFileText, writeErrorFactory(`${name}Store`));
fs.writeFile(`src/TableViews/${name}s.js`, tableViewFileText, writeErrorFactory(`${name}TableView`));