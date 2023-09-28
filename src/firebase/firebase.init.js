// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbO8MuYI6BAIMjItA9WWbX9VWf0uCY2a4",
    authDomain: "module-50-email-password-auth.firebaseapp.com",
    projectId: "module-50-email-password-auth",
    storageBucket: "module-50-email-password-auth.appspot.com",
    messagingSenderId: "769944365195",
    appId: "1:769944365195:web:b712c415331dffc691cc8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth
