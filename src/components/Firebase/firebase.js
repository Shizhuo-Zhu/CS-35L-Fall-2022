// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import app from 'firebase/app';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgTTxgLjInbnDE95PxPufk6jRMNhz0KGs",
  authDomain: "cs35l-deb37.firebaseapp.com",
  projectId: "cs35l-deb37",
  storageBucket: "cs35l-deb37.appspot.com",
  messagingSenderId: "695336358121",
  appId: "1:695336358121:web:4323e9d437fc8c1f1f6078"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}


