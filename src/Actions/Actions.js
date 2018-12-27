import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

export function createOrRetriveUser() {
    let headers = getAuthorizationHeader();
    fetch(host, { headers })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
            }
        })
        .then(accounts => dispatcher.dispatch({
            type: 'REFRESH_ACCOUNTS',
            accounts: accounts
        }));
}

export function acceptOffer(options) {
    let headers = getAuthorizationHeader();
    Object.assign(headers, { 'Content-Type': 'application/json' });
    console.log(options);
    // fetch(`http://localhost:5000/api/trades`, {
    fetch(`${ host }/trades`, {
        headers,
        method: 'POST', 
        body: JSON.stringify(options) 
    }).then(res => {
        console.log(res.status);
        console.log(res.statusText);
        return res.text();
    }).then(t => console.log(t));
}

export function deposit(account_id, deposit_amount) {
    const headers = {
        'Content-Type': 'application/json'
    }
    const path = `${ host }/deposit`;
    const body = JSON.stringify({
        account_id,
        deposit_amount
    });
    fetch(path, {
        method: 'POST', 
        body,
        headers
    })
    .then(res => res.json())
    .then(account => {
        dispatcher.dispatch({
            type: 'UPDATE_ACCOUNT',
            account
        });
    });
}

export function withdrawal(account_id, withdrawal_amount) {
    const headers = {
        'Content-Type': 'application/json'
    }
    const path = `${ host }/withdrawal`;
    const body = JSON.stringify({
        account_id,
        withdrawal_amount
    });
    fetch(path, {
        method: 'POST', 
        body,
        headers
    })
    .then(res => res.json())
    .then(account => {
        console.log(account);
        dispatcher.dispatch({
            type: 'UPDATE_ACCOUNT',
            account
        });
    });
}