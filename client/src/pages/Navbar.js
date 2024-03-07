
// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import { Menu as MenuIcon, Home as HomeIcon, AddBox as AddBoxIcon, FormatListBulleted as FormatListBulletedIcon, ExitToApp as ExitToAppIcon, AccountCircle as AccountCircleIcon, WorkOutline as WorkOutlineIcon } from '@mui/icons-material'; // Import WorkOutlineIcon
// import { Link , useNavigate} from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout confirmation dialog

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (token) {
//           setIsLoggedIn(true); // User is logged in
//           const decodedToken = parseJwt(token);
//           const role = decodedToken.role;
//           setUserRole(role);
//         } else {
//           setIsLoggedIn(false); // User is logged out
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         console.error(error.response?.data?.message);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   const handleLogout = () => {
//     setIsLogoutDialogOpen(true); // Open logout confirmation dialog
//   };

//   const confirmLogout = () => {
//     // Perform logout operations here
//     setIsLoggedIn(false);
//     localStorage.removeItem('token');
//     navigate('/login');
//     setIsLogoutDialogOpen(false); // Close logout confirmation dialog
//   };

//   const cancelLogout = () => {
//     setIsLogoutDialogOpen(false); // Close logout confirmation dialog
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {/* Replace text with WorkOutlineIcon */}
//           <WorkOutlineIcon style={{ marginRight: '8px' }} />
//           <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
//             Leave Management System
//           </Typography>
//           <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
//         <List>
//           <ListItem button component={Link} to="/list" onClick={toggleDrawer}>
//             <HomeIcon />
//             <ListItemText primary="Home" />
//           </ListItem>
//           {isLoggedIn && (
//             <ListItem button component={Link} to="/create" onClick={toggleDrawer}>
//               <AddBoxIcon />
//               <ListItemText primary="Create Leave" />
//             </ListItem>
//           )}
//           {isLoggedIn && userRole !== 'employee' && (
//             <ListItem button component={Link} to="/all-list" onClick={toggleDrawer}>
//               <FormatListBulletedIcon />
//               <ListItemText primary="All List" />
//             </ListItem>
//           )}
//           <Divider />
//           {!isLoggedIn && (
//             <>
//               <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
//                 <AccountCircleIcon />
//                 <ListItemText primary="Login" />
//               </ListItem>
//             </>
//           )}
//           {isLoggedIn && (
//             <ListItem button onClick={handleLogout}>
//               <ExitToAppIcon />
//               <ListItemText primary="Logout" />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>

//       {/* Logout Confirmation Dialog */}
//       <Dialog open={isLogoutDialogOpen} onClose={cancelLogout}>
//         <DialogTitle>Confirm Logout</DialogTitle>
//         <DialogContent>
//           Are you sure you want to logout?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={cancelLogout} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={confirmLogout} color="primary">
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Navbar;













// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';
// import { Menu as MenuIcon, Home as HomeIcon, AddBox as AddBoxIcon, FormatListBulleted as FormatListBulletedIcon, ExitToApp as ExitToAppIcon, AccountCircle as AccountCircleIcon, WorkOutline as WorkOutlineIcon } from '@mui/icons-material'; // Import WorkOutlineIcon
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout confirmation dialog
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (token) {
//           setIsLoggedIn(true); // User is logged in
//           const decodedToken = parseJwt(token);
//           const role = decodedToken.role;
//           setUserRole(role);
//         } else {
//           setIsLoggedIn(false); // User is logged out
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         console.error(error.response?.data?.message);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   const handleLogout = () => {
//     setIsLogoutDialogOpen(true); // Open logout confirmation dialog
//   };

//   const confirmLogout = () => {
//     // Perform logout operations here
//     setIsLoggedIn(false);
//     localStorage.removeItem('token');
//     setIsLogoutDialogOpen(false); // Close logout confirmation dialog
//   };

//   const cancelLogout = () => {
//     setIsLogoutDialogOpen(false); // Close logout confirmation dialog
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {/* Replace text with WorkOutlineIcon */}
//           <WorkOutlineIcon style={{ marginRight: '8px' }} />
//           <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
//             Leave Management System
//           </Typography>
//           <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
//         <List>
//           <ListItem button component={Link} to="/list" onClick={toggleDrawer}>
//             <HomeIcon />
//             <ListItemText primary="Home" />
//           </ListItem>
//           {isLoggedIn && (
//             <ListItem button component={Link} to="/create" onClick={toggleDrawer}>
//               <AddBoxIcon />
//               <ListItemText primary="Create Leave" />
//             </ListItem>
//           )}
//           {isLoggedIn && userRole !== 'employee' && (
//             <ListItem button component={Link} to="/all-list" onClick={toggleDrawer}>
//               <FormatListBulletedIcon />
//               <ListItemText primary="All List" />
//             </ListItem>
//           )}
//           <Divider />
//           {!isLoggedIn && (
//             <>
//               <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
//                 <AccountCircleIcon />
//                 <ListItemText primary="Login" />
//               </ListItem>
//             </>
//           )}
//           {isLoggedIn && (
//             <ListItem button onClick={handleLogout}>
//               <ExitToAppIcon />
//               <ListItemText primary="Logout" />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>

//       {/* Logout Confirmation Dialog */}
//       <Dialog open={isLogoutDialogOpen} onClose={cancelLogout}>
//         <DialogTitle>Confirm Logout</DialogTitle>
//         <DialogContent>
//           Are you sure you want to logout?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={cancelLogout} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={confirmLogout} color="primary">
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for displaying error messages */}
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="error">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Snackbar, Alert } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, AddBox as AddBoxIcon, FormatListBulleted as FormatListBulletedIcon, AccountCircle as AccountCircleIcon, WorkOutline as WorkOutlineIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'; // Import ExitToAppIcon for logout
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage] = useState('');

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <ListItem button component={Link} to="/list" onClick={toggleDrawer}>
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
          {!isLoggedIn ? (
            <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
              <AccountCircleIcon />
              <ListItemText primary="Login" />
            </ListItem>
          ) : (
            <ListItem button component={Link} to="/logout">
                <ExitToAppIcon />
            <ListItemText primary="Logout" />
                 </ListItem>
          )}
        </List>
      </Drawer>

      {/* Snackbar for displaying error messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
