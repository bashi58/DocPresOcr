import React, { useState } from 'react';
import Analyze from './Analyze.jsx';
import './Signup.css'; 

function Login({onLoginSuccess}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setLoginSuccess(true); 
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Login failed');
      });
      onLoginSuccess();
  };

  return (
    <div className="signup-container"> 
      {!loginSuccess ? (
        <form onSubmit={handleSubmit} className="registration-form"> 
          <div>
            <h2>Login Form</h2>
          </div>
          <div>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
        <Analyze /> 
        </div>
      )}
    </div>
  );
}

export default Login;
