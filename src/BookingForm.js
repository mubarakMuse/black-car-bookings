// BookingForm.js
import React, { useRef, useState } from 'react';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import './BookingForm.css';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook


const BookingForm = () => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
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

    const center = { lat: 44.8831, lng: -93.2289 }

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
                <Grid item xs={12} sm={6}>
                    <form onSubmit={handleSubmit} className="booking-form">
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
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                    </GoogleMap>
                </Grid>
            </Grid>

            {/* Cost Summary Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogTitle>Booking Summary</DialogTitle>
                <DialogContent>
                    <Container className="details-box">
                        <p className="details-label">Full Name: {formData.fullName}</p>
                        <p className="details-label">Email: {formData.email}</p>
                        <p className="details-label">Phone Number: {formData.phone}</p>
                        <p className="details-label">Pickup Location: {formData.pickupLocation}</p>
                        <p className="details-label">Dropoff Location: {formData.dropoffLocation}</p>
                        <p className="details-label">Date and Time: {formData.dateTime}</p>
                        <p className="details-label">Type of Ride: {formData.rideType}</p>
                        <p className="details-label">Distance: {formData.distance}</p>
                        <p className="details-label">Duration: {formData.duration}</p>
                        <p className="details-label">Total Cost: ${formData.totalCost.toFixed(2)} {formData.totalCost === 70 ? "[Minimum ride cost]" : null}</p>
                        <p className="details-label">Payment Method: {formData.paymentMethod}</p>

                    </Container>
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: '100%', height: '400px' }}
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
                    <Button onClick={handleCloseModal} color="secondary">
                        Close
                    </Button>
                    <Button onClick={handleConfirmBooking} color="primary">
    Confirm Booking
</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BookingForm;

