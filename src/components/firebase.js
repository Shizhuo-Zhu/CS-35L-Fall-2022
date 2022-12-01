import { initializeApp } from "firebase/app";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged,
  createUserWithEmailAndPassword, sendPasswordResetEmail, signOut,
} from 'firebase/auth';
import {
  getFirestore, collection, addDoc, setDoc, doc, getDocs, deleteDoc
} from "firebase/firestore";
import {
  getStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVnKU7tJPrjHls6kUNkJshtYseAZCuA5U",
  authDomain: "racer-fitness.firebaseapp.com",
  projectId: "racer-fitness",
  storageBucket: "racer-fitness.appspot.com",
  messagingSenderId: "43875997509",
  appId: "1:43875997509:web:560aea361552eebfdf502c",
  measurementId: "G-ER5B3JJRGT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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
    await setDoc(doc(db, "users", user.uid), {
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

const addExercise = (date, exercise) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      addDoc(collection(db, "users", user.uid, "dates", date, "exercises"), {
        exercise,
      });
    }
  })
}

const addBodyweight = (date, weight) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDoc(doc(db, "users", user.uid, "dates", date), {
          weight,
        })
      }
    });
}

const DeleteExercise = (date, id) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      deleteDoc(doc(db, "users", user.uid, "dates", date, "exercises", id));
    }
  })
}

export {
  auth, db, logIn, register, passwordReset, logout, addExercise, addBodyweight, DeleteExercise,
};




