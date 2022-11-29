import { Google } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, sendPasswordResetEmail, signOut,
} from 'firebase/auth';
import {
  getFirestore, query, getDocs, collection, where, addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZtpVNAOIop_HtPfHrv2YPhJirFOAFvW8",
  authDomain: "cs35l-project-99e31.firebaseapp.com",
  projectId: "cs35l-project-99e31",
  storageBucket: "cs35l-project-99e31.appspot.com",
  messagingSenderId: "954504558969",
  appId: "1:954504558969:web:e3189df5a563b5f40dd7a8",
  measurementId: "G-H2WEKP7DRL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logIn = async(email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const register = async(name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const passwordReset = async(email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Link to reset password sent");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth, db, logIn, register, passwordReset, logout,
};




