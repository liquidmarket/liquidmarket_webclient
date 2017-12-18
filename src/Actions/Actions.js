import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

export function createOrRetriveUser() {
    let headers = getAuthorizationHeader();
    fetch(host, { headers })
        .then(res => res.json())
        .then(accounts => dispatcher.dispatch({
            type: 'REFRESH_ACCOUNTS',
            accounts: accounts
        }));
}