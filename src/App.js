// src/App.js
// Remove unnecessary import statements
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Remove unused imports
import Navbar from './Navbar';
import HomePage from './HomePage';
import ConfirmationPage from './ConfirmationPage';
import ViewRequests from './ViewRequests';

const App = () => {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/view-requests" element={<ViewRequests />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
