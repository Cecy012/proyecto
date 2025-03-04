import { initializeApp } from 'firebase/app'; // Importamos la función de inicialización
import { getFirestore } from 'firebase/firestore';  // Si vas a usar Firestore
import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhXydphcgOM4Nkf2yky9cbk-JlYqt2o3I",
  authDomain: "fir-4b-47b7d.firebaseapp.com",
  databaseURL: "https://fir-4b-47b7d-default-rtdb.firebaseio.com",
  projectId: "fir-4b-47b7d",
  storageBucket: "fir-4b-47b7d.firebasestorage.app",
  messagingSenderId: "130656331430",
  appId: "1:130656331430:web:7e4c657ec9f2a29e4f7667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);