
import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AddExercise from './pages/AddExercise';
import Schedule from './pages/Calendar';
import Reset from "./pages/Reset"
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
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