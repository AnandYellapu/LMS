import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const LeaveSearch = ({ label, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          label={label}
          placeholder="Enter search term..."
          variant="outlined"
          value={searchTerm}
          onChange={handleChange}
          size="small"
        />
        <Button type="submit" variant="contained" color="primary" size="medium" sx={{ ml: 1 }}>
          Search
        </Button>
      </form>
    </Box>
  );
};

export default LeaveSearch;
