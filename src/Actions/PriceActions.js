import dispatcher from "./../dispatcher";
import { host } from "./../constants";

export function refreshPrices(){
    fetch(host + '/markets')
        .then(res => res.json())
        .then(prices => dispatcher.dispatch({
            type: 'REFRESH_PRICE',
            prices: prices
        }));
}
