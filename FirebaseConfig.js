// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5x6UO3FRtnFihvXacZMuF-zaW-WxEM4M",
  authDomain: "pwin-da6c3.firebaseapp.com",
  projectId: "pwin-da6c3",
  storageBucket: "pwin-da6c3.appspot.com",
  messagingSenderId: "1082162021754",
  appId: "1:1082162021754:web:8e593e6d36c28db56482c3",
  measurementId: "G-S47YNC0NFJ"
};

// Initialize Firebase
const PWin_App = initializeApp(firebaseConfig);
const analytics = getAnalytics(PWin_App);
export const PWin_AUTH = getAuth(PWin_App);
export const PWin_DB = getFirestore(PWin_App);