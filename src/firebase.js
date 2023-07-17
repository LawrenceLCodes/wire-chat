// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf-qj8SnZMgdom4LRrMwLcCl7PQQeWJiU",
  authDomain: "wire-chat-b46bd.firebaseapp.com",
  projectId: "wire-chat-b46bd",
  storageBucket: "wire-chat-b46bd.appspot.com",
  messagingSenderId: "429811728363",
  appId: "1:429811728363:web:bb2c39d6fc452be1f923ae",
  measurementId: "G-E6EKBK6YBG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// For authentication
export const auth = getAuth();
// Create a root reference for storing/uploading images to firebase storage
export const storage = getStorage();

// const analytics = getAnalytics(app);