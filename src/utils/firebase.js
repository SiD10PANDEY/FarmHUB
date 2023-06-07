// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk4Zf1Q2PQhHhP2me5DpS1xLrtsPOv1ls",
  authDomain: "ridehub-406b2.firebaseapp.com",
  projectId: "ridehub-406b2",
  storageBucket: "ridehub-406b2.appspot.com",
  messagingSenderId: "1006537529542",
  appId: "1:1006537529542:web:968eb674cd686ee5a05fc7"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);