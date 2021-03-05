import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCi499emAUZoHaTHwNznxzJ2C5HGDz7TYw",
    authDomain: "assignment-7ef36.firebaseapp.com",
    databaseURL: "https://assignment-7ef36.firebaseio.com",
    projectId: "assignment-7ef36",
    storageBucket: "assignment-7ef36.appspot.com",
    messagingSenderId: "1019352962845",
    appId: "1:1019352962845:web:d3ccc5e0a1953f8a02f3f4",
    measurementId: "G-X3WNFLYKPC"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
export { firebaseApp, storage}