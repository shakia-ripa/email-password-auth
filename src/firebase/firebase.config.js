// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNe9-udEN1OpZEkfo7sQa5us6k1XWRep0",
  authDomain: "user-email-password-auth-d357e.firebaseapp.com",
  projectId: "user-email-password-auth-d357e",
  storageBucket: "user-email-password-auth-d357e.appspot.com",
  messagingSenderId: "224821790673",
  appId: "1:224821790673:web:dc29b8d10fa25e520442f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;