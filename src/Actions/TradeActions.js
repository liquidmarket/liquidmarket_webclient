import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

export function refreshTrades(){
    let headers = getAuthorizationHeader();
    fetch(host + '/trades', { headers })
        .then(res => res.json())
        .then(trades => dispatcher.dispatch({
            type: 'REFRESH_TRADE',
            trades
        }));
}
