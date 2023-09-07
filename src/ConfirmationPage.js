// src/components/ConfirmationPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const ConfirmationPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center">
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" align="center">
        Thank you for choosing LuxeRide. We will contact you shortly!
      </Typography>
      {/* Add any additional content or links as needed */}
    </Container>
  );
};

export default ConfirmationPage;
