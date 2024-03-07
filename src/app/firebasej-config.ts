// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmjJVnzNGNp_sNZt4Yoc0hRbv7LWw1HlA",
  authDomain: "maduka-f97a5.firebaseapp.com",
  projectId: "maduka-f97a5",
  storageBucket: "maduka-f97a5.appspot.com",
  messagingSenderId: "76180216541",
  appId: "1:76180216541:web:cb8e5858e81454d0179934",
  measurementId: "G-VJDDH7J439",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
