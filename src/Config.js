// Config.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref as databaseRef, onValue, off } from "firebase/database";
import { getAuth } from 'firebase/auth'; // Remove getReactNativePersistence import
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Remove ref import, it's not needed here

const firebaseConfig = {
  apiKey: "AIzaSyD5x6UO3FRtnFihvXacZMuF-zaW-WxEM4M",
  authDomain: "pwin-da6c3.firebaseapp.com",
  databaseURL: "https://pwin-da6c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pwin-da6c3",
  storageBucket: "pwin-da6c3.appspot.com",
  messagingSenderId: "1082162021754",
  appId: "1:1082162021754:web:8e593e6d36c28db56482c3",
  measurementId: "G-S47YNC0NFJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Remove getReactNativePersistence call
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, db, firestore, databaseRef, onValue, storage, off }; // Remove uploadBytes, storageRef, getDownloadURL exports