// config/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration - replace with your config
const firebaseConfig = {
  apiKey: "AIzaSyC5G3Es_JaxU2o1NFH15YCoYfk-812Y_o4",
  authDomain: "moviediscovery-ca954.firebaseapp.com",
  projectId: "moviediscovery-ca954",
  storageBucket: "moviediscovery-ca954.firebasestorage.app",
  messagingSenderId: "1020152708190",
  appId: "1:1020152708190:web:810feb65ae1cd9293948cf",
  measurementId: "G-HBTG6TPT6M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);

export default app;
