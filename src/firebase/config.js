import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAwjqX3UMCL6bM53XjLgd0zffw7Ne12mWM",
    authDomain: "prog3-tt-lws.firebaseapp.com",
    projectId: "prog3-tt-lws",
    storageBucket: "prog3-tt-lws.firebasestorage.app",
    messagingSenderId: "693084184723",
    appId: "1:693084184723:web:f667569b7c9788e4746d66"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();