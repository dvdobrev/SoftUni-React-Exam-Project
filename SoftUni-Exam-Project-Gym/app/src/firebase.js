import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



//TODO: make the apiKey in .env - now it comes
// with error thast why i use the key directly

//TODO: delete the all console.log, especially in the register form

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC80rpwInIVmWf7gRHOfj3jQ6hxO3cAqcw",
    authDomain: "project-gym-dobrin-dobrev.firebaseapp.com",
    databaseURL: "https://project-gym-dobrin-dobrev-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-gym-dobrin-dobrev",
    storageBucket: "project-gym-dobrin-dobrev.appspot.com",
    messagingSenderId: "1083571113554",
    appId: "1:1083571113554:web:1c8650bb499e693979598b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();