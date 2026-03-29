// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmy2_ulgbfWFySnFyZ7lCmlD6ChR9-FJs",
  authDomain: "summarist-e1f1f.firebaseapp.com",
  projectId: "summarist-e1f1f",
  storageBucket: "summarist-e1f1f.firebasestorage.app",
  messagingSenderId: "527948292060",
  appId: "1:527948292060:web:26e200061f3aa0f595b919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)