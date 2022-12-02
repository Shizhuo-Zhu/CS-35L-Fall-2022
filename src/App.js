import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Schedule from './pages/Calendar';
import Reset from "./pages/Reset"
import Profile from "./pages/Profile.js"
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ActivityList from './pages/ActivityList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/exercise-log" element={<Schedule/>}/>
        <Route path="/list" element={<ActivityList/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
