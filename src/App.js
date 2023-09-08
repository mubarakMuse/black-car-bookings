import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Navbar';
import HomePage from './HomePage';
import ConfirmationPage from './ConfirmationPage';
import ViewRequests from './ViewRequests';
import BookingForm from './BookingForm';

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
        {/* Add a footer here */}
        {/* <footer style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center', marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} LuxeRide. All rights reserved.
        </footer> */}
      </Router>
    </div>
  );
};

export default App;
