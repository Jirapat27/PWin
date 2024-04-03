import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // Adjusted imports for database
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Timestamp from Firestore
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getDatabase(app);
const firestore = getFirestore(app);

export { auth, db, firestore, ref, onValue }; // Exporting ref and onValue for database operations