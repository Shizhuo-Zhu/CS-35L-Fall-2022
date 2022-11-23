import React from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Reset from './pages/Reset';
import DashBoard from './pages/DashBoard';
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
      </Routes>
    </Router>
  );
}

export default App;