import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "../constants";

export function refreshListings(){
    let headers = getAuthorizationHeader();
    fetch(`${ host }/prices`, { headers })
        .then(res => res.json())
        .then(listings => dispatcher.dispatch({
            type: 'REFRESH_LISTING',
            listings: listings
        }));
}
