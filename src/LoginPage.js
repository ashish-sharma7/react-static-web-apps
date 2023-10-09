import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './LoginPage.css'; // Import the CSS file for LoginPage
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Use useNavigate instead of history

  const handleLogin = async () => {
    try {
      // Make a POST request to the authentication API to obtain the token
      const response = await fetch('https://rglassapi.azurewebsites.net/api/token', {
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
        const token = data.token;

        // Save the token as a cookie
        Cookies.set('jwtToken', token);

        // Fetch data from the API using the JWT token and navigate to ActivityPage
        fetch('https://rglassapi.azurewebsites.net/api/Activity', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error fetching data from the API');
            }
          })
          .then(() => {
            // Navigate to ActivityPage
            navigate('/activity');
          })
          .catch((error) => {
            // Handle API fetch error
            console.error('Error fetching data from the API:', error);
          });
      } else {
        // Handle login error, display a message, etc.
      }
    } catch (error) {
      // Handle network errors
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
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
