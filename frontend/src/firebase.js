//firebase.js
//contains setup for firebase, this way it is only done once
import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase configuration settings.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "dsctdisertation.firebaseapp.com",
  projectId: "dsctdisertation",
  storageBucket: "dsctdisertation.appspot.com",
  messagingSenderId: "646787657364",
  appId: "1:646787657364:web:e7049c79bbad4e49458e81",
  measurementId: "G-6C96L0B9P2"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
