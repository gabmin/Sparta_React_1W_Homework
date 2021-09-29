// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoQ3abzlIqXMFFdO6FNl0smhT5XwHmGZ0",
  authDomain: "mysparta-d2fde.firebaseapp.com",
  projectId: "mysparta-d2fde",
  storageBucket: "mysparta-d2fde.appspot.com",
  messagingSenderId: "729817665093",
  appId: "1:729817665093:web:8305af92b68ee6189b1d2c",
  measurementId: "G-57HHNNXPGB",
};
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
