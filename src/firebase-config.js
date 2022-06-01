import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
   apiKey: API_KEY,
   authDomain: "first-project-d3140.firebaseapp.com",
   databaseURL: "https://first-project-d3140-default-rtdb.firebaseio.com",
   projectId: "first-project-d3140",
   storageBucket: "first-project-d3140.appspot.com",
   messagingSenderId: "811717720880",
   appId: "1:811717720880:web:0d696dc7e0f660cb33a6f5",
   measurementId: "G-QYM2NXFCV8"
 };

 const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);