// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz-Rtt9XZ-g3jhtL7MVFK5vNtxjb93mHI",
  authDomain: "react-crud-710b3.firebaseapp.com",
  databaseURL:"https://react-crud-710b3-default-rtdb.firebaseio.com",
  projectId: "react-crud-710b3",
  storageBucket: "react-crud-710b3.appspot.com",
  messagingSenderId: "765927779530",
  appId: "1:765927779530:web:ad4c2d27804ee0d9bc9833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);