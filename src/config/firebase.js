import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
// Replace these with your Firebase project credentials
// Get these from: https://console.firebase.google.com

const firebaseConfig = {
  apiKey: "AIzaSyA7n1MtNkX9Kr7wOveQZ8lxfCoD4AS4vxQ",
  authDomain: "foodstreet-8c148.firebaseapp.com",
  projectId: "foodstreet-8c148",
  storageBucket: "foodstreet-8c148.firebasestorage.app",
  messagingSenderId: "16807403835",
  appId: "1:16807403835:web:e068d1c4ff4fc4d919d71e",
  measurementId: "G-PTRY5K0F3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
