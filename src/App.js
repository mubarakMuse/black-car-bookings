import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Navbar';
import HomePage from './HomePage';
import ConfirmationPage from './ConfirmationPage';
import ViewRequests from './ViewRequests';
import BookingForm from './BookingForm';
import StickyFooter from './StickyFooter';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/requests" element={<ViewRequests />} />
          <Route
            path="/book"
            element={
              <div style={{ padding: '20px' }}>
                {/* Add spacing between NavBar and BookingForm */}
                <div style={{ margin: '20px 0' }}></div>
                <BookingForm />
              </div>
            }
          />
        </Routes>
    <StickyFooter/>
      </Router>
    </div>
  );
};

export default App;
