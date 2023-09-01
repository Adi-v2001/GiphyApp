// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAru2itXBdR28LfvZHKyIps-EmJE4HU_d0",
  authDomain: "giphy-firebase-auth.firebaseapp.com",
  projectId: "giphy-firebase-auth",
  storageBucket: "giphy-firebase-auth.appspot.com",
  messagingSenderId: "777990431221",
  appId: "1:777990431221:web:fe3ebf0857c14be05b00bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export{app, auth};