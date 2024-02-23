import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, AddBox as AddBoxIcon, FormatListBulleted as FormatListBulletedIcon, ExitToApp as ExitToAppIcon, AccountCircle as AccountCircleIcon, WorkOutline as WorkOutlineIcon } from '@mui/icons-material'; // Import WorkOutlineIcon
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          setIsLoggedIn(true); // User is logged in
          const decodedToken = parseJwt(token);
          const role = decodedToken.role;
          setUserRole(role);
        } else {
          setIsLoggedIn(false); // User is logged out
        }
      } catch (error) {
        console.error("Error:", error);
        console.error(error.response?.data?.message);
      }
    };

    fetchUserData();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Replace text with WorkOutlineIcon */}
          <WorkOutlineIcon style={{ marginRight: '8px' }} />
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            Leave Management System
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <HomeIcon />
            <ListItemText primary="Home" />
          </ListItem>
          {isLoggedIn && (
            <ListItem button component={Link} to="/create" onClick={toggleDrawer}>
              <AddBoxIcon />
              <ListItemText primary="Create Leave" />
            </ListItem>
          )}
          {isLoggedIn && userRole !== 'employee' && (
            <ListItem button component={Link} to="/all-list" onClick={toggleDrawer}>
              <FormatListBulletedIcon />
              <ListItemText primary="All List" />
            </ListItem>
          )}
          <Divider />
          {!isLoggedIn && (
            <>
              <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
                <AccountCircleIcon />
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
          {isLoggedIn && (
            <ListItem button component={Link} to="/logout" onClick={toggleDrawer}>
              <ExitToAppIcon />
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;


