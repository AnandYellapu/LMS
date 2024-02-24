import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import Pagination from './Pagination';
import Search from './Search';

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLeaveIds, setSelectedLeaveIds] = useState([]);
  const [bulkComment, setBulkComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);
        const userRole = decodedToken.role;

        setUserRole(userRole);

        const response = await axios.get('https://lms-be-tk3j.onrender.com/api/leaves/all-list', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const sortedLeaveRequests = response.data.leaveRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLeaveRequests(sortedLeaveRequests);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
        toast.error('Failed to fetch leave requests. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredLeaveRequests = leaveRequests.filter(request =>
    request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (leaveId, newStatus, comment) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/status`, { status: newStatus, comment }, {  //eslint-disable-line
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLeaveRequests(prevLeaveRequests =>
        prevLeaveRequests.map(request =>
          request._id === leaveId ? { ...request, status: newStatus } : request
        )
      );

      toast.success(`Leave request updated successfully`);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      toast.error('Failed to update leave request. Please try again.');
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeaveRequests.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBulkAction = async (action, bulkComment) => {
    setLoading(true);
    try {
      for (const leaveId of selectedLeaveIds) {
        await handleStatusChange(leaveId, action, bulkComment);
      }
      setSelectedLeaveIds([]);
      setBulkComment('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSelectLeave = (leaveId) => {
    if (selectedLeaveIds.includes(leaveId)) {
      setSelectedLeaveIds(selectedLeaveIds.filter(id => id !== leaveId));
    } else {
      setSelectedLeaveIds([...selectedLeaveIds, leaveId]);
    }
  };

  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>Leave Request Approval</Typography>

      {localStorage.getItem('token') && !loading && !error && (
        <Search label="Search with name,type and status" onSearch={handleSearch} />
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
                  {userRole === 'manager' && (
                    <TableCell><Skeleton /></TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && error && (
        <Typography variant="h6" align="center" color="error">{error}</Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Number of Days</TableCell>
                <TableCell>Substitute</TableCell>
                <TableCell>Status</TableCell>
                {(userRole === 'manager' || userRole === 'admin') && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell style={{ whiteSpace: 'pre-wrap' }}>
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
                  {(userRole === 'manager' || userRole === 'admin') && request.status !== 'approved' && request.status !== 'rejected' && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleStatusChange(request._id, 'approved', comment)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleStatusChange(request._id, 'rejected', comment)}
                      >
                        Reject
                      </Button>
                      <TextField
                        label="Comment"
                        variant="outlined"
                        size="small"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </TableCell>
                  )}
                  {((userRole !== 'manager' && userRole !== 'admin') || (request.status === 'approved') || (request.status === 'rejected')) && (
                    <TableCell>Buttons disabled</TableCell>
                  )}
                  {(userRole === 'manager' || userRole === 'admin') && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedLeaveIds.includes(request._id)}
                        onChange={() => handleSelectLeave(request._id)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {localStorage.getItem('token') && !loading && !error && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredLeaveRequests.length / itemsPerPage)}
            onPageChange={onPageChange}
          />
        </Box>
      )}

      {(userRole === 'manager' || userRole === 'admin') && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="success"
            disabled={selectedLeaveIds.length === 0}
            onClick={() => handleBulkAction('approved', bulkComment)}
          >
            Approve Selected
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedLeaveIds.length === 0}
            onClick={() => handleBulkAction('rejected', bulkComment)}
          >
            Reject Selected
          </Button>
          <TextField
            label="Bulk Comment"
            variant="outlined"
            size="small"
            value={bulkComment}
            onChange={(e) => setBulkComment(e.target.value)}
          />
        </Box>
      )}

      <ToastContainer />
    </div>
  );
};

export default LeaveApproval;
