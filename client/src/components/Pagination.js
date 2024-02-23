import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, useMediaQuery } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange, labels, customIcons }) => {
  const [pageNumberInput, setPageNumberInput] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        onPageChange(currentPage - 1);
        break;
      case 'ArrowRight':
        onPageChange(currentPage + 1);
        break;
      case 'Home':
        onPageChange(1);
        break;
      case 'End':
        onPageChange(totalPages);
        break;
      case 'Enter':
        handleGoToPage();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentPage, totalPages]); // eslint-disable-line

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPageNumberInput(value);
    if (value !== '' && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > totalPages)) {
      setValidationMessage(`Invalid page number. Please enter a number between 1 and ${totalPages}.`);
    } else {
      setValidationMessage('');
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageNumberInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setPageNumberInput('');
    } else {
      setValidationMessage(`Invalid page number. Please enter a number between 1 and ${totalPages}.`);
    }
  };

  const { firstLabel = 'First', prevLabel = 'Previous', nextLabel = 'Next', lastLabel = 'Last' } = labels || {};
  const { firstIcon, prevIcon, nextIcon, lastIcon } = customIcons || {};

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Button disabled={currentPage === 1} onClick={() => onPageChange(1)} startIcon={firstIcon}>{firstLabel}</Button>
      <Button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} startIcon={prevIcon}>{prevLabel}</Button>
      <span>
        Page <TextField type="number" size="small" value={pageNumberInput} onChange={handleInputChange} 
        inputProps={{ style: { width: isSmallScreen ? '40px' : '60px' }}} /> of {totalPages}
        <Button onClick={handleGoToPage}>Go</Button>
        {validationMessage && <span style={{ color: 'red', marginLeft: '5px' }}>{validationMessage}</span>}
      </span>
      <Button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} endIcon={nextIcon}>{nextLabel}</Button>
      <Button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)} endIcon={lastIcon}>{lastLabel}</Button>
    </Box>
  );
};

export default Pagination;
