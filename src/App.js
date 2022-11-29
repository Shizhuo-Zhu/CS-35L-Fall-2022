import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AddExercise from './pages/AddExercise';
import Schedule from './pages/Calendar';
import Reset from "./pages/Reset"
import NotFound from './pages/NotFound';
import { useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {db} from './components/firebase.js'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  // get data from firebase
  useEffect(() => {
    const getUser = async () => {
        // return all documents of a specific collection
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    };
    getUser();
  }, []);
  // add to firebase
  const createUser = async() => {
    // first argument is the collection you want to add to, the second argument is the document value
    await addDoc(userCollectionRef, {name: newName, age: newAge});
  };
  // update firebase
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "user", id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);

  }
  // delete
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
  }
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/calendar" element={<Schedule/>}/>
        <Route path="/addexercise" element={<AddExercise/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/reset" element={<Reset />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;