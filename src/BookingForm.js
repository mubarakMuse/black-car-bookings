import React, { useRef, useState } from 'react';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { useJsApiLoader, Autocomplete, DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import './BookingForm.css';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook

const BookingForm = () => {
    const google = window.google;
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        pickupLocation: '',
        dropoffLocation: '',
        dateTime: '',
        specialInstructions: '',
        rideType: '',
        numPassengers: '',
        paymentMethod: '',
        totalCost: 0
    });

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const originRef = useRef();
    const destinationRef = useRef();

    async function calculateRoute() {
        if (formData.pickupLocation === '' || formData.dropoffLocation === '') {
            return;
        }

        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: formData.pickupLocation,
            destination: formData.dropoffLocation,
            travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirectionsResponse(results);

        // Update the formData with duration, distance, and totalCost
        const newFormData = {
            ...formData,
            duration: results.routes[0].legs[0].duration.text,
            distance: results.routes[0].legs[0].distance.text,
        };

        // Calculate cost based on distance (you can customize this logic)
        const distanceinMiles = results.routes[0].legs[0].distance.value / 1609;

        const costPerMile = 10; // Customize this rate
        const totalCost = distanceinMiles * costPerMile;

        // Add the total cost to the formData
        newFormData.totalCost = totalCost < 70 ? 70 : totalCost;

        // Update the state with the new formData
        setFormData(newFormData);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePlaceSelect = (place, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: place.formatted_address,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        calculateRoute();
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const navigate = useNavigate();
    const saveRequest = (request) => {
        // Retrieve existing requests from local storage
        const existingRequests = JSON.parse(localStorage.getItem('requests')) || [];

        // Add the new request to the existing requests
        const updatedRequests = [...existingRequests, request];

        // Save the updated requests back to local storage
        localStorage.setItem('requests', JSON.stringify(updatedRequests));
    };

    const handleConfirmBooking = () => {
        // Close the dialog

        saveRequest(formData); // Save the form data as a request

        // Navigate to the confirmation page after a delay (e.g., 2 seconds)
        setTimeout(() => {
            setOpenModal(false);
            navigate('/confirmation'); // Navigate to the '/confirmation' route
        }, 2000); // Adjust the delay as needed
    };

    if (!isLoaded) {
        return <>Loading...</>;
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <form onSubmit={handleSubmit} className="booking-form">
                        <Typography variant="h5">Enter Your Booking Details</Typography>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder='Full Name'
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Email'
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='Phone'
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                onLoad={(autocomplete) => (originRef.current = autocomplete)}
                                onPlaceChanged={() =>
                                    handlePlaceSelect(originRef.current.getPlace(), 'pickupLocation')
                                }
                            >
                                <TextField
                                    type="text"
                                    id="pickupLocation"
                                    name="pickupLocation"
                                    value={formData.pickupLocation}
                                    onChange={handleInputChange}
                                    placeholder='Pickup Location'
                                    required
                                    fullWidth

                                />
                            </Autocomplete>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
                                onPlaceChanged={() =>
                                    handlePlaceSelect(destinationRef.current.getPlace(), 'dropoffLocation')
                                }
                            >
                                <TextField
                                    type="text"
                                    id="dropoffLocation"
                                    name="dropoffLocation"
                                    value={formData.dropoffLocation}
                                    onChange={handleInputChange}
                                    placeholder='Dropoff Location'
                                    required
                                    fullWidth

                                />
                            </Autocomplete>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="datetime-local"
                                id="dateTime"
                                name="dateTime"
                                value={formData.dateTime}
                                onChange={handleInputChange}
                                placeholder='Date and Time'
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="paymentMethod">Type of Ride</InputLabel>
                            <Select
                                id="rideType"
                                name="rideType"
                                value={formData.rideType}
                                onChange={handleInputChange}
                                placeholder='Type of Ride'
                                required
                            >
                                <MenuItem value="oneWay">One-Way</MenuItem>
                                <MenuItem value="twoWay">Two-Way</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="number"
                                id="numPassengers"
                                name="numPassengers"
                                value={formData.numPassengers}
                                onChange={handleInputChange}
                                placeholder='Number of Passengers'
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="paymentMethod">Payment Method</InputLabel>
                            <Select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                placeholder='Payment Method'
                                required
                            >
                                <MenuItem value="cash">Cash</MenuItem>
                                <MenuItem value="creditCard">Credit Card</MenuItem>
                            </Select>
                        </FormControl>
                        <Button             fullWidth
variant="contained" color="primary" type="submit" style={{color:"white", backgroundColor: 'black' }} // Changed button background color to black
                        >
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>

            {/* Cost Summary Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogTitle>Booking Summary</DialogTitle>
                <DialogContent>
                    <Container className="details-box">
                        <Typography variant="h6">Your Booking Details</Typography>
                        <p><strong>Full Name:</strong> {formData.fullName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone Number:</strong> {formData.phone}</p>
                        <Typography variant="h6">Ride Information</Typography>
                        <p><strong>Pickup Location:</strong> {formData.pickupLocation}</p>
                        <p><strong>Dropoff Location:</strong> {formData.dropoffLocation}</p>
                        <p><strong>Date and Time:</strong> {formData.dateTime}</p>
                        <p><strong>Type of Ride:</strong> {formData.rideType}</p>
                        <p><strong>Number of Passengers:</strong> {formData.numPassengers}</p>
                        <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
                        {formData.distance && formData.duration && (
                            <>
                                <Typography variant="h6">Route Information</Typography>
                                <p><strong>Distance:</strong> {formData.distance}</p>
                                <p><strong>Duration:</strong> {formData.duration}</p>
                                <p><strong>Total Cost:</strong> ${formData.totalCost.toFixed(2)} {formData.totalCost === 70 ? "[Minimum ride cost]" : null}</p>
                            </>
                        )}
                    </Container>
                    <GoogleMap
                        center={formData.pickupLocation ? { lat: 44.8831, lng: -93.2289 } : null}
                        zoom={15}
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                    </GoogleMap>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary" variant="outlined"             fullWidth

                        style={{ borderColor: 'black', color: 'black' }} // Changed button background color to black
                    >
                        Close
                    </Button>
                    <Button             fullWidth
onClick={handleConfirmBooking} color="primary" variant="contained"


                        style={{ color:"white", backgroundColor: 'black' }} // Changed button background color to black
                    >
                        Confirm Booking
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BookingForm;
