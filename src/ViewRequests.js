import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Button, Typography } from '@mui/material';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Retrieve requests from local storage
    const savedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    console.log(savedRequests)

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
      <Typography variant="h4" gutterBottom>
        View Requests
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
              style={{ marginTop: '16px' }}
            >
              Accept Request
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ViewRequests;
