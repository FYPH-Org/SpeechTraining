import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCldCyjs6mC4NBL08IbgAtVCb5Yfq0M94M",
  authDomain: "speechtrainer-97600.firebaseapp.com",
  databaseURL: "https://speechtrainer-97600.firebaseio.com",
  projectId: "speechtrainer-97600",
  storageBucket: "",
  messagingSenderId: "172836020720"
};

export const firebaseApp = firebase.initializeApp(config);
