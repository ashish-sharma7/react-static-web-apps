import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import ActivityPage from './ActivityPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/activity" element={<ActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
