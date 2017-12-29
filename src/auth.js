import { createOrRetriveUser } from "./Actions/Actions";
export function getAuthorizationHeader() {
    let id_token = localStorage.getItem('id_token');
    if (id_token) {
        return { 'Authorization': `Bearer ${id_token}`}
    } else {
        throw new Error("No token loaded");
    }
}
export function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    localStorage.setItem('id_token', id_token);
    var profile = googleUser.getBasicProfile();
    localStorage.setItem('name', profile.getName());
    localStorage.setItem('user_id', profile.getId());
    createOrRetriveUser();
    console.debug('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.debug('Name: ' + profile.getName());
    console.debug('Image URL: ' + profile.getImageUrl());
    console.debug('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    signedInUpdate(true);
}
export function signOut() {
  var auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      localStorage.removeItem("id_token");
      localStorage.removeItem("name");
      localStorage.removeItem("user_id");
      signedInUpdate(false);
  });
}
function signedInUpdate(signedInBoolean) {
    signedIn = signedInBoolean;
    signedInListeners.forEach(listener => {
        listener(signedIn);
    });
}
let signedIn = null;
let signedInListeners = [];
export function signedInListen(listener) {
    if (signedIn !== null) {
        listener(signedIn);
    }
    signedInListeners.push(listener);
}