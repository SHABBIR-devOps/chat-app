
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6QH7G067Z4ub5YfotwgUMtlU3NXq0-PU",
  authDomain: "chatting-app-main-38ebe.firebaseapp.com",
  projectId: "chatting-app-main-38ebe",
  storageBucket: "chatting-app-main-38ebe.firebasestorage.app",
  messagingSenderId: "399587520312",
  appId: "1:399587520312:web:6cc317002096c07a6a5bcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default (app);