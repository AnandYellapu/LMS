import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Pagination from './Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search'; // Import the LeaveSearch component
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const LeaveList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [editLeave, setEditLeave] = useState(null);
  const [updatedLeave, setUpdatedLeave] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9990/api/leaves', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response:', response); // Log the response object
        const sortedLeaveRequests = response.data.leaveRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLeaveRequests(sortedLeaveRequests);
      } catch (error) {
        console.error('Error fetching leave requests:', error); // Log any error that occurred
        setError(error.response?.data?.message || 'Failed to fetch leave requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredLeaveRequests = leaveRequests.filter(request =>
    request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditLeave = (leave) => {
    setEditLeave(leave);
    setUpdatedLeave({ ...leave });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLeave({ ...updatedLeave, [name]: value });
  };

  const handleUpdateLeave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:9990/api/leaves/${editLeave._id}/update`, updatedLeave, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Optimistic UI update
      const updatedLeaveRequests = leaveRequests.map(request => request._id === editLeave._id ? updatedLeave : request);
      setLeaveRequests(updatedLeaveRequests);
      setEditLeave(null);
      toast.success('Leave request updated successfully');
    } catch (error) {
      setError(error.response.data.message || 'Failed to update leave request.');
    }
  };

  const clearError = () => { //eslint-disable-line
    setError(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeaveRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeaveRequests.length / itemsPerPage);

  return (
    <div>
      <Typography variant="h2" gutterBottom>Leave Requests</Typography>
      
      {localStorage.getItem('token') && !loading && !error && (
      <Search label="Search by type and status" onSearch={handleSearch} />
      )}
      
      {loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>No Of Days</TableCell>
                <TableCell>Substitute</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>
                    {request.reason.length > 50 ? (
                      <>
                        {request.reason.slice(0, 50)}...
                        <Button variant="text" color="primary" onClick={() => alert(request.reason)}>Read More</Button>
                      </>
                    ) : (
                      request.reason
                    )}
                  </TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.numberOfDays}</TableCell>
                  <TableCell>{request.substitute}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.comments.length > 0 && (
                      <ul>
                        {request.comments.map((comment, index) => (
                          <li key={index}>
                          <span className="comment">{comment.comment}</span>
                            <br />
                            <small className='commentedBy'>Commented by: {comment.commentedBy.username}</small>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TableCell>
                  <TableCell>
                  {request.status !== "approved" && request.status !== "rejected" && (
                    <Button variant="outlined" onClick={() => handleEditLeave(request)}>Edit</Button>
                  )}
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {localStorage.getItem('token') && !loading && !error && (
        <>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </>
      )}

      {!loading && error && (
        toast.error(error)
      )}

      <Dialog open={editLeave !== null} onClose={() => setEditLeave(null)}>
        <DialogTitle>Edit Leave Request</DialogTitle>
        <DialogContent>
          <TextField
            name="startDate"
            label="Start Date"
            value={updatedLeave.startDate || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="endDate"
            label="End Date"
            value={updatedLeave.endDate || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="reason"
            label="Reason"
            value={updatedLeave.reason || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="type"
            label="Type"
            value={updatedLeave.type || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="numberOfDays"
            label="Number of Days"
            value={updatedLeave.numberOfDays || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="substitute"
            label="Substitute"
            value={updatedLeave.substitute || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" startIcon={<CheckIcon />} onClick={handleUpdateLeave}>Update</Button>
          <Button variant="contained" startIcon={<CloseIcon />} onClick={() => setEditLeave(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default LeaveList;

