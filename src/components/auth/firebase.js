// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEYS,
    authDomain: process.env.REACT_APP_AUTH_DOMAINS,
    projectId: process.env.REACT_APP_PROJECT_IDS,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKETS,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_IDS,
    appId: process.env.REACT_APP_APP_IDS,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);