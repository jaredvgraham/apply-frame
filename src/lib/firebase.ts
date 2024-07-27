// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp6FhI165WEgJW-QiDuAF64cD15m4nSzE",
  authDomain: "apply-frame.firebaseapp.com",
  projectId: "apply-frame",
  storageBucket: "apply-frame.appspot.com",
  messagingSenderId: "708293942558",
  appId: "1:708293942558:web:adb53e1330df17bf9a3d0f",
  measurementId: "G-66W4MX1DV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
