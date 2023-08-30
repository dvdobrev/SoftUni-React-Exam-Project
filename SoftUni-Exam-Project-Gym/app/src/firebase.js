import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "project-gym-dobrin-dobrev.firebaseapp.com",
    databaseURL: "https://project-gym-dobrin-dobrev-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-gym-dobrin-dobrev",
    storageBucket: "project-gym-dobrin-dobrev.appspot.com",
    messagingSenderId: "1083571113554",
    appId: "1:1083571113554:web:1c8650bb499e693979598b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

