import { NavLink, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import './App.css'; 
import Login from '../screens/Login.jsx';
import Signup from '../screens/Signup.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showHistory, setShowHistory] = useState(false); 

  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleSignupSuccess = () => {
    setIsLoggedIn(true); 
    setShowSignup(false); 
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false); 
    setShowSignup(false); 
    setShowHistory(false); 
  };

  return (
    <>
    <div className="chat-header">
        <h2>Medical Diagnosis</h2>
      </div>
    <div className="app-container">
      
      <div className="main-content">
        <div className="left-panel">
          {!isLoggedIn && (
            <>
              <h3>Conduct your medical diagnosis here!</h3>
              <h5>Login or Sign Up to start with diagnosis</h5>
              <button className="signup-btn" onClick={() => setShowLogin(true)}>Login</button>
              <button className="signup-btn" onClick={() => setShowSignup(true)}>Signup</button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="signup-btn" onClick={handleLogout}><NavLink to="/">Logout</NavLink></button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="signup-btn"><NavLink to="/analyze">New Chat</NavLink></button>
              <button className="signup-btn" onClick={() => setShowHistory(true)}><NavLink to="/history">History</NavLink></button>
            </>
          )}
        </div>
        <div className="right-panel">
          {showLogin && !isLoggedIn && (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
          {showSignup && !isLoggedIn && (
            <Signup onSignupSuccess={handleSignupSuccess} />
          )}
          {showHistory && (
            <div>
              <Outlet></Outlet>
            </div>
          )}
          
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
