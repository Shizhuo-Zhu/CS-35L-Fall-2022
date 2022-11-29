import React from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBoard from './DashBoard';
import AddExercise from './AddExercise';
import Reset from './pages/Reset';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/addexercise" element={<AddExercise/>}/>
      </Routes>
    </Router>
  );
}

export default App;