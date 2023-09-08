import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white', // Changed background color to white
    padding: '32px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    color: 'black', // Changed title color to black
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '32px',
    textAlign: 'center',
    color: 'black', // Changed subtitle color to black
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  };

  const buttonStyle = {
    width: '200px',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'white', // Changed button text color to white
  };

  return (
    <Box style={containerStyle}>
      <Typography variant="h1" style={titleStyle}>
        Welcome to LuxeRide
      </Typography>
      <Typography variant="h6" style={subtitleStyle}>
      Book a black car for a comfortable and luxurious ride.
      </Typography>
      <Box style={buttonContainerStyle}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/book"
          style={{ ...buttonStyle, backgroundColor: 'black' }} // Changed button background color to black
        >
          Request A Ride
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/requests"
          style={{ ...buttonStyle, borderColor: 'black', color: 'black' }} // Changed button border color and text color to black
        >
          Ride Requests
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;

