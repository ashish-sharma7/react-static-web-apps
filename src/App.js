import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import ActivityPage from './ActivityPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="https://green-water-070b80d10.3.azurestaticapps.net/activity" element={<ActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
