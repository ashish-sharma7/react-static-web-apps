import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './ActivityPage.css';

const ActivityPage = () => {
  const itemsPerPage = 100;
  const [activityData, setActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [currentPage]);

  const totalPages = Math.ceil(activityData.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const displayedData = activityData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {displayedData.map((activity, index) => (
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
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ActivityPage;
