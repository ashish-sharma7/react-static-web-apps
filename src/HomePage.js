import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import your CSS file here

const HomePage = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Replace 'https://rglassapi.azurewebsites.net/api/Activity' with your API endpoint
    const apiEndpoint = 'https://rglassapi.azurewebsites.net/api/Activity';

    // Replace 'your-token-here' with your actual JWT token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiJkMGU3NjE2Yy1jNDEyLTQzNzAtOTA8Cf0';

    // Set the token in the state
    setToken(token);

    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cookie': 'ARRAffinity=22a7daa836b64a8ce56c907737553d08297ff2e76cd06a1f52c29956b9a85c17; ARRAffinitySameSite=22a7daa836b64a8ce56c907737553d08297ff2e76cd06a1f52c29956b9a85c17',
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data from the API:', error));
  }, []);

  return (
    <div>
      <h1>Activity Tracker Monitor</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>App Name</th>
            <th>Process Name</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.appname}</td>
              <td>{item.processname}</td>
              <td>{item.starttime}</td>
              <td>{item.endtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* The Line chart */}
      {/* Use the chartData object to render your chart */}
    </div>
  );
};

export default HomePage; 