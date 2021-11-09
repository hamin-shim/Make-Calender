// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaQGf6whhcWDeueOYM-keLrrYfPxfBCS8",
  authDomain: "calender-7f5ab.firebaseapp.com",
  projectId: "calender-7f5ab",
  storageBucket: "calender-7f5ab.appspot.com",
  messagingSenderId: "753954648659",
  appId: "1:753954648659:web:66f9e298860ef901eb0ca6",
  measurementId: "G-DF1HNG6R8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);