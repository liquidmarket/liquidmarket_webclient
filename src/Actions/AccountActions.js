import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

const path = '/accounts';
const url = host + path;

export function createAccount(name) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'POST', 
        body: JSON.stringify({ name }) 
    };
    options.headers['Content-Type'] = 'application/json';
    fetch(url, options)
        .then(res => {
            if (res.status === 201) {
                return res.json();
            } else {
                var e = new Error('Opps, account was not created');
                throw e;
            }
        })
        .catch(reason => {
            alert(reason.message);
            return Promise.reject();
        })
        .then(account => {
            dispatcher.dispatch({
                type: 'CREATE_ACCOUNT',
                account
            });
        });
}

export function updateAccount(id, name) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'PUT', 
        body: JSON.stringify({ name }) 
    };
    options.headers['Content-Type'] = 'application/json';
    fetch(`${url}/${id}`, options)
        .then(res => res.json())
        .then(account => {
            dispatcher.dispatch({
                type: 'UPDATE_ACCOUNT',
                account
            });
        });
}

export function refreshAccounts(){
    let headers = getAuthorizationHeader();
    fetch(url, { headers })
        .then(res => res.json())
        .then(accounts => dispatcher.dispatch({
            type: 'REFRESH_ACCOUNTS',
            accounts: accounts
        }));
}

export function deleteAccount(id) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'DELETE'
    };
    fetch(`${url}/${id}`, options)
        .then(res => res.status)
        .then(status => {
            if (status === 200) {
                dispatcher.dispatch({
                    type: 'DELETE_ACCOUNT',
                    id
                });
            } else {
                alert('did not delete');
            }
        });
}