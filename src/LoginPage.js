import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from './apiConfig'; // Import the API configuration

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(API_CONFIG.authentication.token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          const token = data.token;
          Cookies.set('jwtToken', token);

          fetch(API_CONFIG.activity.data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw Error('Error fetching data from the API');
              }
            })
            .then(() => {
              navigate('/activity');
            })
            .catch((error) => {
              console.error('Error fetching data from the API:', error);
            });
        } else {
          console.error('Token not found in the response');
        }
      } else {
        console.error('Login request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          id="username" // Add id attribute
          name="username" // Add name attribute
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          id="password" // Add id attribute
          name="password" // Add name attribute
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
