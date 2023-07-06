// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDga_Stz_COVs2MN_Zfg0XWOOa9PNnL6XQ",
  authDomain: "vite-contact-33e75.firebaseapp.com",
  projectId: "vite-contact-33e75",
  storageBucket: "vite-contact-33e75.appspot.com",
  messagingSenderId: "378426736508",
  appId: "1:378426736508:web:a48621f666a354a3606ef9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);