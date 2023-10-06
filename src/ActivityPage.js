import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './ActivityPage.css';

const ActivityPage = () => {
  const [activityData, setActivityData] = useState([]);

  const fetchData = async () => {
    try {
      const token = Cookies.get('jwtToken');
      const response = await fetch('https://rglassapi.azurewebsites.net/api/Activity', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setActivityData(data);
      } else {
        console.error('Error fetching data from the API:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="activity-container">
      <h1>Activity Details</h1>
      <table className="activity-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Application ID</th>
            <th>Application Name</th>
            <th>Process Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity, index) => (
            <tr key={index}>
              <td>{activity.id}</td>
              <td>{activity.applicationid}</td>
              <td className="application-name">{activity.appname}</td>
              <td>{activity.processname}</td>
              <td>{activity.starttime}</td>
              <td>{activity.endtime}</td>
              <td>{activity.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityPage;
