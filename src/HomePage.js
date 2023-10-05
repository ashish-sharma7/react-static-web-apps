import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import your CSS file here

// ... rest of your code ...

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint (replace with your API URL)
    // For example, you can use the Fetch API or axios to make the request

    // Replace 'https://localhost:7026/api/Activity' with your actual API endpoint
    fetch('https://localhost:7026/api/Activity', { method: 'GET' })
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
