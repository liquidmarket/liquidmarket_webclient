import dispatcher from "./../dispatcher";
import { host } from "./../constants";

export function refreshPrices(){
    fetch(host + '/prices')
        .then(res => res.json())
        .then(prices => dispatcher.dispatch({
            type: 'REFRESH_PRICE',
            prices: prices
        }));
}
