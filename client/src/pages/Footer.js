import React from 'react';
import { motion } from 'framer-motion';
import { AppBar, Toolbar, Typography, IconButton, Link } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography variant="body1" align="center" style={{ flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} Leave Management System. All rights reserved.
          </Typography>
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton color="inherit" component={Link} href="https://github.com" target="_blank">
              <GitHub />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton color="inherit" component={Link} href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton color="inherit" component={Link} href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton color="inherit" component={Link} href="mailto:example@example.com">
              <Email />
            </IconButton>
          </motion.div>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Footer;
