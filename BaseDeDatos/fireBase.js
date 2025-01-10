import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyAOpxga9zWmEXCbMyEkt6NPdV83MNYM98E",
  authDomain: "smartmood-20780.firebaseapp.com",
  projectId: "smartmood-20780",
  storageBucket: "smartmood-20780.firebasestorage.app",
  messagingSenderId: "45170863701",
  appId: "1:45170863701:web:214befd4f1994a98872edc",
  measurementId: "G-7V4PBCTLQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);

export default{
    app,
    db, 
    collection, 
    addDoc,
    auth
};