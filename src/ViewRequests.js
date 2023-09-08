import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// AccessCodeForm component
const AccessCodeForm = ({ onAccessCodeSubmit }) => {
  const [accessCode, setAccessCode] = useState('');
  const defaultTheme = createTheme();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the access code is correct (replace with your actual access code)
    if (accessCode.trim() === process.env.REACT_APP_ACCESS_CODE) {
      onAccessCodeSubmit(true);
    } else {
      alert('Access code is incorrect.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Access Code
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="accessCode"
            label="Access Code"
            name="accessCode"
            autoFocus
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ color: 'white', backgroundColor: 'black' }}

          >
            Sign In
          </Button>
  
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
};

// ViewRequests component
const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isAccessCodeCorrect, setIsAccessCodeCorrect] = useState(false);

  useEffect(() => {
    // Retrieve requests from local storage
    const savedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(savedRequests);
  }, []);

  const handleAcceptRequest = (index) => {
    // Handle accepting a request (you can add your logic here)
    // For example, you can remove the request from the list once accepted.
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
    // You can also update local storage or send a request to a server.
  };

  return (
    <Container>
      {isAccessCodeCorrect ? (
        <>
          <Typography variant="h4" gutterBottom>
            Ride Requests
          </Typography>
          {requests.map((request, index) => (
            <Card key={index} variant="outlined" style={{ marginBottom: '16px' }}>
              <CardContent>
              <Typography variant="h6" component="div">
              Requested by: {request.fullName}
            </Typography>
            <Typography color="text.secondary">Email: {request.email}</Typography>
            <Typography color="text.secondary">Phone: {request.phone}</Typography>
            <Typography color="text.secondary">Pickup Location: {request.pickupLocation}</Typography>
            <Typography color="text.secondary">Dropoff Location: {request.dropoffLocation}</Typography>
            <Typography color="text.secondary">Date and Time: {request.dateTime}</Typography>
            <Typography color="text.secondary">Type of Ride: {request.rideType}</Typography>
            <Typography color="text.secondary">Distance: {request.distance}</Typography>
            <Typography color="text.secondary">Duration: {request.duration}</Typography>
            <Typography color="text.secondary">Total Cost: {request.totalCost ? `$${request.totalCost.toFixed(2)}` : 'N/A'}</Typography>
            <Typography color="text.secondary">Payment Method: {request.paymentMethod}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAcceptRequest(index)}
                  style={{ marginTop: '16px', color: 'white', backgroundColor: 'black' }}
                >
                  Accept Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <AccessCodeForm onAccessCodeSubmit={setIsAccessCodeCorrect} />
      )}
    </Container>
  );
};

export default ViewRequests;
