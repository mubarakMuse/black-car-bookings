import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import YourLogo from './logo.svg'; // Change to the actual path of your logo image
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const appBarStyle = {
    backgroundColor: 'black', // Change to your brand color
  };

  const titleStyle = {
    flexGrow: 1,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white', // Change to your brand color
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyle = {
    marginRight: '8px',
    width: '60px', // Adjust the width of the logo
    height: '40px', // Adjust the height of the logo
  };

  return (
    <AppBar position="static" style={appBarStyle}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={titleStyle}
        >
          <img src={YourLogo} alt="Logo" style={logoStyle} /> LuxeRide
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" style={{ color: 'black' }} />
          </ListItem>
          <ListItem button component={Link} to="/book">
            <ListItemText primary="Book a ride" style={{ color: 'black' }} />
          </ListItem>
          <ListItem button component={Link} to="/requests">
            <ListItemText primary="View Ride Requests" style={{ color: 'black' }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
