// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generater.firebaseapp.com",
  projectId: "ai-logo-generater",
  storageBucket: "ai-logo-generater.firebasestorage.app",
  messagingSenderId: "75317206317",
  appId: "1:75317206317:web:c451116fe9c5279d7c87a4",
  measurementId: "G-BFYESPB7HR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
