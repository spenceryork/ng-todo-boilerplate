'use strict';

todoApp.factory("UserFactory", function($q, $http, FirebaseUrl, FBCreds) {

  var config = {
    apiKey: FBCreds.key,
    authDomain: FBCreds.authDomain
  };

  firebase.initializeApp(config);

  let currentUser = null;

  firebase.auth().onAuthStateChanged( (user) => {
    if(user) {
      console.log("user", user);
      currentUser = user.uid;
    } else {
      console.log("logged out");
      currentUser = null;
    }
  });

  let getUser = () => {
    return currentUser;
  };

  let createUser = (userObj) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch( (err) => {
      console.log("error creating user", err.message);
    });
  };

  let loginUser = (userObj) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch( (err) => {
      console.log("error loggin in", err.message);
    });
  };

  let logoutUser = () => {
    return firebase.auth().signOut()
    .catch( (err) => {
      console.log("error loggin' out, man", err.message);
    });
  };

  console.log("firebase", firebase );

  return {getUser, createUser, loginUser, logoutUser};
});
