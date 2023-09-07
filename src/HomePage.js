// src/components/HomePage.js
import React from 'react';
import BookingForm from './BookingForm';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center">
        Welcome to LuxeRide
      </Typography>
      <Typography variant="body1" align="center">
        Book a black car for a comfortable and luxurious ride.
      </Typography>
      <BookingForm />
    </Container>
  );
};

export default HomePage;
