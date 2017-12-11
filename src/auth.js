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
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
export function sendToken() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://enhanced-emblem-188503.appspot.com');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + localStorage.getItem('id_token'));
}
export function signOut() {
  var auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      localStorage.removeItem("id_token");
  });
}