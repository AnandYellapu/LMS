// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { Typography, Button, Container, Grid, Slide } from '@mui/material';
// // import { Work as WorkIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
// // import { styled } from '@mui/system';

// // // Styled components for enhanced styling
// // const StyledContainer = styled(Container)(({ theme }) => ({
// //   paddingTop: theme.spacing(8),
// //   paddingBottom: theme.spacing(8),
// // }));

// // const StyledSection = styled('section')(({ theme }) => ({
// //   backgroundColor: theme.palette.background.paper,
// //   padding: theme.spacing(4),
// //   borderRadius: theme.spacing(2),
// //   boxShadow: theme.shadows[4],
// //   textAlign: 'center',
// //   marginBottom: theme.spacing(4),
// // }));

// // const StyledButton = styled(Button)(({ theme }) => ({
// //   marginTop: theme.spacing(4),
// //   padding: theme.spacing(1, 4),
// //   borderRadius: theme.spacing(4),
// //   transition: 'background-color 0.3s, color 0.3s',
// //   '&:hover': {
// //     backgroundColor: theme.palette.secondary.main, // Change hover color to secondary main
// //   },
// // }));

// // function LandingPage() {
// //   return (
// //     <StyledContainer>
// //       <Grid container justifyContent="center">
// //         <Grid item xs={12} md={8} lg={6}>
// //           <StyledSection>
// //             <WorkIcon sx={{ fontSize: 48, marginBottom: 2 }} />
// //             <Typography variant="h4" gutterBottom>Welcome to Leave Management System</Typography>
// //             <Typography variant="subtitle1" gutterBottom>Easily manage your employee leaves!</Typography>
// //           </StyledSection>
// //         </Grid>
// //       </Grid>
// //       <Grid container spacing={3} justifyContent="center">
// //         <Grid item xs={12} md={8} lg={6}>
// //           <StyledSection>
// //             <Typography variant="h5" gutterBottom>Features</Typography>
// //             <ul>
// //               <li><Typography variant="body1">Submit leave requests</Typography></li>
// //               <li><Typography variant="body1">Approve or reject leave requests</Typography></li>
// //               <li><Typography variant="body1">View leave history</Typography></li>
// //             </ul>
// //           </StyledSection>
// //         </Grid>
// //         <Grid item xs={12} md={8} lg={6}>
// //           <StyledSection>
// //             <Typography variant="h5" gutterBottom>Ready to get started?</Typography>
// //             <Slide direction="up" in={true} mountOnEnter unmountOnExit>
// //               <Link to="/login" style={{ textDecoration: 'none' }}>
// //                 <StyledButton variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
// //                   Login
// //                 </StyledButton>
// //               </Link>
// //             </Slide>
// //           </StyledSection>
// //         </Grid>
// //       </Grid>
// //     </StyledContainer>
// //   );
// // }

// // export default LandingPage;






// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Typography, Button, Container, Grid, Slide } from '@mui/material';
// import { Work as WorkIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
// import { styled } from '@mui/system';

// // Styled components for enhanced styling
// const StyledContainer = styled(Container)(({ theme }) => ({
//   paddingTop: theme.spacing(8),
//   paddingBottom: theme.spacing(8),
// }));

// const StyledSection = styled('section')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   padding: theme.spacing(4),
//   borderRadius: theme.spacing(2),
//   boxShadow: theme.shadows[4],
//   textAlign: 'center',
//   marginBottom: theme.spacing(4),
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(4),
//   padding: theme.spacing(1, 4),
//   borderRadius: theme.spacing(4),
//   transition: 'background-color 0.3s, color 0.3s',
//   '&:hover': {
//     backgroundColor: theme.palette.secondary.main, // Change hover color to secondary main
//   },
// }));

// const StyledFeatureList = styled('ul')(({ theme }) => ({
//   listStyle: 'none',
//   padding: 0,
// }));

// const StyledFeatureItem = styled('li')(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   '&:before': {
//     content: '"✓"',
//     marginRight: theme.spacing(1),
//     color: theme.palette.secondary.main, // Change bullet color to secondary main
//   },
//   '&:hover': {
//     color: theme.palette.primary.main, // Change text color on hover to primary main
//   },
// }));

// function LandingPage() {
//   return (
//     <StyledContainer>
//       <Grid container justifyContent="center">
//         <Grid item xs={12} md={8} lg={6}>
//           <StyledSection>
//             <WorkIcon sx={{ fontSize: 48, marginBottom: 2 }} />
//             <Typography variant="h4" gutterBottom>Welcome to Leave Management System</Typography>
//             <Typography variant="subtitle1" gutterBottom>Easily manage your employee leaves!</Typography>
//           </StyledSection>
//         </Grid>
//       </Grid>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid item xs={12} md={8} lg={6}>
//           <StyledSection>
//             <Typography variant="h5" gutterBottom>Features</Typography>
//             <StyledFeatureList>
//               <StyledFeatureItem><Typography variant="body1">Submit leave requests</Typography></StyledFeatureItem>
//               <StyledFeatureItem><Typography variant="body1">Approve or reject leave requests</Typography></StyledFeatureItem>
//               <StyledFeatureItem><Typography variant="body1">View leave history</Typography></StyledFeatureItem>
//             </StyledFeatureList>
//           </StyledSection>
//         </Grid>
//         <Grid item xs={12} md={8} lg={6}>
//           <StyledSection>
//             <Typography variant="h5" gutterBottom>Ready to get started?</Typography>
//             <Slide direction="up" in={true} mountOnEnter unmountOnExit>
//               <Link to="/login" style={{ textDecoration: 'none' }}>
//                 <StyledButton variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
//                   Login
//                 </StyledButton>
//               </Link>
//             </Slide>
//           </StyledSection>
//         </Grid>
//       </Grid>
//     </StyledContainer>
//   );
// }

// export default LandingPage;






import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Grid, Slide } from '@mui/material';
import { Work as WorkIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

// Styled components for enhanced styling
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const StyledSection = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1, 4),
  borderRadius: theme.spacing(4),
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StyledFeature = styled('div')(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)', // Zoom effect on hover
  },
}));

function LandingPage() {
  return (
    <StyledContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <StyledSection>
            <WorkIcon sx={{ fontSize: 48, marginBottom: 2 }} />
            <Typography variant="h4" gutterBottom>Welcome to Leave Management System</Typography>
            <Typography variant="subtitle1" gutterBottom>Easily manage your employee leaves!</Typography>
          </StyledSection>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <StyledSection>
            <Typography variant="h5" gutterBottom>Features</Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <StyledFeature>
                  <Typography variant="body1" color="primary">Submit leave requests</Typography>
                </StyledFeature>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledFeature>
                  <Typography variant="body1" color="primary">Approve or reject leave requests</Typography>
                </StyledFeature>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledFeature>
                  <Typography variant="body1" color="primary">View leave history</Typography>
                </StyledFeature>
              </Grid>
            </Grid>
          </StyledSection>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <StyledSection>
            <Typography variant="h5" gutterBottom>Ready to get started?</Typography>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
                  Login
                </StyledButton>
              </Link>
            </Slide>
          </StyledSection>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default LandingPage;
