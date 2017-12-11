import { getAuthorizationHeader } from "./auth";

export function getUsers(callback) {
    let options = { 
        headers: getAuthorizationHeader(), 
        method: 'GET'
    };
    options.headers['Content-Type'] = 'application/json';
    fetch('https://enhanced-emblem-188503.appspot.com/users', options).then(r => r.json()).then(j => callback(j));
}