// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqfMp250zcI069p2L64LKgPZUyiYrUQp8",
  authDomain: "blogplatform-5e6cf.firebaseapp.com",
  projectId: "blogplatform-5e6cf",
  storageBucket: "blogplatform-5e6cf.firebasestorage.app",
  messagingSenderId: "270841632359",
  appId: "1:270841632359:web:64e65dc094e22a5156a6c2",
  measurementId: "G-ZHZRCZKVDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);