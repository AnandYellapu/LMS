import React from 'react';
import { Container, Typography, Link, Box, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Leave Management System
          </Typography>
          <Box>
            <IconButton component={Link} href="https://github.com/example" target="_blank" rel="noopener noreferrer">
              <GitHub />
            </IconButton>
            <IconButton component={Link} href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </IconButton>
            <IconButton component={Link} href="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
