import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyArFmXAS_AmrEwL8GZsmvr8FEZinpY8HYg",
  authDomain: "feedback-f6b42.firebaseapp.com",
  projectId: "feedback-f6b42",
  storageBucket: "feedback-f6b42.appspot.com",
  messagingSenderId: "607071129085",
  appId: "1:607071129085:web:9f520018c7e4d7bd6d9d94",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
