import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

export function refreshShareHoldings() {
    let headers = getAuthorizationHeader();
    fetch(`${host}/accounts`, { headers })
        .then(res => res.json())
        .then(accounts => {
            accounts.forEach(account => {
                addShareHolding(account);
            });
        });
}

function addShareHolding(account){
    let headers = getAuthorizationHeader();
    fetch(`${host}/accounts/${account.id}/shareholdings`, { headers })
        .then(res => res.json())
        .then(shareholdings => dispatcher.dispatch({
            type: 'ADD_SHAREHOLDING',
            account_shareholdings: {
                account_id: account.id,
                name: account.name,
                shareholdings
            }
        }));
}