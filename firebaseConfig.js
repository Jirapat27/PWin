import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
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

export { auth, db };