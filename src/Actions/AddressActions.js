import dispatcher from "./../dispatcher";
import { getAuthorizationHeader } from "./../auth";
import { host } from "./../constants";

export function refreshAddresses(){
    let headers = getAuthorizationHeader();
    fetch( host + '/addresses', { headers })
        .then(res => res.json())
        .then(addresses => dispatcher.dispatch({
            type: 'REFRESH_ADDRESS',
            addresses: addresses
        }));
}

export function updateAddress(id, address) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'PUT', 
        body: JSON.stringify({ address }) 
    };
    options.headers['Content-Type'] = 'application/json';
    fetch(`${ host }/addresses/${ id }`, options)
        .then(r => r.status)
        .then(s => {
            if (s === 200) {
                refreshAddresses();
            } else {
                alert(s);
            }
        });
}

export function createAddress(address) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'POST', 
        body: JSON.stringify({ address }) 
    };
    options.headers['Content-Type'] = 'application/json';
    fetch(`${ host }/addresses`, options)
        .then(r => r.status)
        .then(s => {
            if (s === 201) {
                refreshAddresses();
            } else {
                alert(s);
            }
        });
}

export function deleteAddress(id) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'DELETE'
    };
    fetch(`${ host }/addresses/${ id }`, options)
        .then(r => r.status)
        .then(s => {
            if (s === 200) {
                refreshAddresses();
            } else {
                alert(s);
            }
        });
}