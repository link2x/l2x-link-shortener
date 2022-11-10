// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU2snXy61LnHnuwbB9fnmCRFNSupU4tTA",
  authDomain: "l2x-link-shortener.firebaseapp.com",
  projectId: "l2x-link-shortener",
  storageBucket: "l2x-link-shortener.appspot.com",
  messagingSenderId: "809802057039",
  appId: "1:809802057039:web:7ff294a61ff8c4d944b13a",
  measurementId: "G-J0RMYMEEXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}