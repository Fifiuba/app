// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_fAr5j7fbdhezakqnBmSLW2xEZ9Uki2U",
  authDomain: "user-service-9def8.firebaseapp.com",
  databaseURL: "https://user-service-9def8-default-rtdb.firebaseio.com",
  projectId: "user-service-9def8",
  storageBucket: "user-service-9def8.appspot.com",
  messagingSenderId: "627165168741",
  appId: "1:627165168741:web:23447b751047a7ca24b28c",
  measurementId: "G-YL8STET37V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
