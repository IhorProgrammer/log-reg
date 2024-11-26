// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_wLHQl5gZYqT42nWii77A4rjaxyz6Z8g",
  authDomain: "log-reg-b00cb.firebaseapp.com",
  projectId: "log-reg-b00cb",
  storageBucket: "log-reg-b00cb.firebasestorage.app",
  messagingSenderId: "32812990881",
  appId: "1:32812990881:web:471b169e787af395570be0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { app, database };
