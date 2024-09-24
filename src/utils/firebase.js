// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC53KkOwI_DCZFuqgb9iGPf12Fikb03PQs",
    authDomain: "recipe-management-f4110.firebaseapp.com",
    projectId: "recipe-management-f4110",
    storageBucket: "recipe-management-f4110.appspot.com",
    messagingSenderId: "990711928442",
    appId: "1:990711928442:web:6d4c9ffd52c4195fc60dc3",
    measurementId: "G-59KTW802G5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };
