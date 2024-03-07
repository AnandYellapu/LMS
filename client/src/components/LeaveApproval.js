// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Box, Snackbar, Alert } from '@mui/material';
// // // // import Skeleton from 'react-loading-skeleton';
// // // // import Pagination from './Pagination';
// // // // import Search from './Search';

// // // // const LeaveApproval = () => {
// // // //   const [leaveRequests, setLeaveRequests] = useState([]);
// // // //   const [userRole, setUserRole] = useState('');
// // // //   const [comment, setComment] = useState('');
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const itemsPerPage = 5;
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedLeaveIds, setSelectedLeaveIds] = useState([]);
// // // //   const [bulkComment, setBulkComment] = useState('');
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [snackbarMessage, setSnackbarMessage] = useState('');
// // // //   const [openSnackbar, setOpenSnackbar] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const token = localStorage.getItem('token');
// // // //         const decodedToken = parseJwt(token);
// // // //         const userRole = decodedToken.role;

// // // //         setUserRole(userRole);

// // // //         const response = await axios.get('https://lms-be-tk3j.onrender.com/api/leaves/all-list', {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`
// // // //           }
// // // //         });
// // // //         const sortedLeaveRequests = response.data.leaveRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// // // //         setLeaveRequests(sortedLeaveRequests);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         setError(error.response.data.message);
// // // //         setLoading(false);
// // // //         setSnackbarMessage('Failed to fetch leave requests. Please try again.');
// // // //         setOpenSnackbar(true);
// // // //       }
// // // //     };

// // // //     fetchUserData();
// // // //   }, []);

// // // //   const handleSearch = (term) => {
// // // //     setSearchTerm(term);
// // // //   };

// // // //   const filteredLeaveRequests = leaveRequests.filter(request =>
// // // //     request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     request.status.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   const handleStatusChange = async (leaveId, newStatus, comment) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const token = localStorage.getItem('token');

// // // //       const response = await axios.put(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/status`, { status: newStatus, comment }, {  //eslint-disable-line
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`
// // // //         }
// // // //       });

// // // //       setLeaveRequests(prevLeaveRequests =>
// // // //         prevLeaveRequests.map(request =>
// // // //           request._id === leaveId ? { ...request, status: newStatus } : request
// // // //         )
// // // //       );

// // // //       setSnackbarMessage('Leave request updated successfully');
// // // //       setOpenSnackbar(true);
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       setError(error.response.data.message);
// // // //       setSnackbarMessage('Failed to update leave request. Please try again.');
// // // //       setOpenSnackbar(true);
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const parseJwt = (token) => {
// // // //     try {
// // // //       return JSON.parse(atob(token.split('.')[1]));
// // // //     } catch (e) {
// // // //       return null;
// // // //     }
// // // //   };

// // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //   const currentItems = filteredLeaveRequests.slice(indexOfFirstItem, indexOfLastItem);

// // // //   const onPageChange = (pageNumber) => {
// // // //     setCurrentPage(pageNumber);
// // // //   };

// // // //   const handleBulkAction = async (action, bulkComment) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       for (const leaveId of selectedLeaveIds) {
// // // //         await handleStatusChange(leaveId, action, bulkComment);
// // // //       }
// // // //       setSelectedLeaveIds([]);
// // // //       setBulkComment('');
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSelectLeave = (leaveId) => {
// // // //     if (selectedLeaveIds.includes(leaveId)) {
// // // //       setSelectedLeaveIds(selectedLeaveIds.filter(id => id !== leaveId));
// // // //     } else {
// // // //       setSelectedLeaveIds([...selectedLeaveIds, leaveId]);
// // // //     }
// // // //   };

// // // //   const handleCloseSnackbar = () => {
// // // //     setOpenSnackbar(false);
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <Typography variant="h2" align="center" gutterBottom>Leave Request Approval</Typography>

// // // //       <Search label="Search with name,type and status" onSearch={handleSearch} />

// // // //       {loading && (
// // // //         <TableContainer component={Paper}>
// // // //           <Table>
// // // //             <TableBody>
// // // //               {Array.from({ length: itemsPerPage }).map((_, index) => (
// // // //                 <TableRow key={index}>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   <TableCell><Skeleton /></TableCell>
// // // //                   {userRole === 'manager' && (
// // // //                     <TableCell><Skeleton /></TableCell>
// // // //                   )}
// // // //                 </TableRow>
// // // //               ))}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       )}

// // // //       {!loading && error && (
// // // //         <Typography variant="h6" align="center" color="error">{error}</Typography>
// // // //       )}

// // // //       {!loading && !error && (
// // // //         <TableContainer component={Paper}>
// // // //           <Table>
// // // //             <TableHead>
// // // //               <TableRow>
// // // //                 <TableCell>Name</TableCell>
// // // //                 <TableCell>Start Date</TableCell>
// // // //                 <TableCell>End Date</TableCell>
// // // //                 <TableCell>Reason</TableCell>
// // // //                 <TableCell>Type</TableCell>
// // // //                 <TableCell>Number of Days</TableCell>
// // // //                 <TableCell>Substitute</TableCell>
// // // //                 <TableCell>Status</TableCell>
// // // //                 {(userRole === 'manager' || userRole === 'admin') && <TableCell>Actions</TableCell>}
// // // //               </TableRow>
// // // //             </TableHead>
// // // //             <TableBody>
// // // //               {currentItems.map((request) => (
// // // //                 <TableRow key={request._id}>
// // // //                   <TableCell>{request.userName}</TableCell>
// // // //                   <TableCell>{request.startDate}</TableCell>
// // // //                   <TableCell>{request.endDate}</TableCell>
// // // //                   <TableCell style={{ whiteSpace: 'pre-wrap' }}>
// // // //                     {request.reason.length > 50 ? (
// // // //                       <>
// // // //                         {request.reason.slice(0, 50)}...
// // // //                         <Button variant="text" color="primary" onClick={() => alert(request.reason)}>Read More</Button>
// // // //                       </>
// // // //                     ) : (
// // // //                       request.reason
// // // //                     )}
// // // //                   </TableCell>
// // // //                   <TableCell>{request.type}</TableCell>
// // // //                   <TableCell>{request.numberOfDays}</TableCell>
// // // //                   <TableCell>{request.substitute}</TableCell>
// // // //                   <TableCell>{request.status}</TableCell>
// // // //                   {(userRole === 'manager' || userRole === 'admin') && request.status !== 'approved' && request.status !== 'rejected' && (
// // // //                     <TableCell>
// // // //                       <Button
// // // //                         variant="contained"
// // // //                         color="success"
// // // //                         onClick={() => handleStatusChange(request._id, 'approved', comment)}
// // // //                       >
// // // //                         Approve
// // // //                       </Button>
// // // //                       <Button
// // // //                         variant="contained"
// // // //                         color="error"
// // // //                         onClick={() => handleStatusChange(request._id, 'rejected', comment)}
// // // //                       >
// // // //                         Reject
// // // //                       </Button>
// // // //                       <TextField
// // // //                         label="Comment"
// // // //                         variant="outlined"
// // // //                         size="small"
// // // //                         value={comment}
// // // //                         onChange={(e) => setComment(e.target.value)}
// // // //                       />
// // // //                     </TableCell>
// // // //                   )}
// // // //                   {((userRole !== 'manager' && userRole !== 'admin') || (request.status === 'approved') || (request.status === 'rejected')) && (
// // // //                     <TableCell>Buttons disabled</TableCell>
// // // //                   )}
// // // //                   {(userRole === 'manager' || userRole === 'admin') && (
// // // //                     <TableCell>
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={selectedLeaveIds.includes(request._id)}
// // // //                         onChange={() => handleSelectLeave(request._id)}
// // // //                       />
// // // //                     </TableCell>
// // // //                   )}
// // // //                 </TableRow>
// // // //               ))}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       )}

// // // //       <Box display="flex" justifyContent="center" mt={2}>
// // // //         <Pagination
// // // //           currentPage={currentPage}
// // // //           totalPages={Math.ceil(filteredLeaveRequests.length / itemsPerPage)}
// // // //           onPageChange={onPageChange}
// // // //         />
// // // //       </Box>

// // // //       {(userRole === 'manager' || userRole === 'admin') && (
// // // //         <Box display="flex" justifyContent="center" mt={2}>
// // // //           <Button
// // // //             variant="contained"
// // // //             color="success"
// // // //             disabled={selectedLeaveIds.length === 0}
// // // //             onClick={() => handleBulkAction('approved', bulkComment)}
// // // //           >
// // // //             Approve Selected
// // // //           </Button>
// // // //           <Button
// // // //             variant="contained"
// // // //             color="error"
// // // //             disabled={selectedLeaveIds.length === 0}
// // // //             onClick={() => handleBulkAction('rejected', bulkComment)}
// // // //           >
// // // //             Reject Selected
// // // //           </Button>
// // // //           <TextField
// // // //             label="Bulk Comment"
// // // //             variant="outlined"
// // // //             size="small"
// // // //             value={bulkComment}
// // // //             onChange={(e) => setBulkComment(e.target.value)}
// // // //           />
// // // //         </Box>
// // // //       )}

// // // //       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
// // // //         <Alert onClose={handleCloseSnackbar} severity="error">
// // // //           {snackbarMessage}
// // // //         </Alert>
// // // //       </Snackbar>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LeaveApproval;










// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Box, Snackbar } from '@mui/material';
// // // import Skeleton from 'react-loading-skeleton';
// // // import Pagination from './Pagination';
// // // import Search from './Search';

// // // const LeaveApproval = () => {
// // //   const [leaveRequests, setLeaveRequests] = useState([]);
// // //   const [userRole, setUserRole] = useState('');
// // //   const [comment, setComment] = useState('');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 5;
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [selectedLeaveIds, setSelectedLeaveIds] = useState([]);
// // //   const [bulkComment, setBulkComment] = useState('');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [snackbarMessage, setSnackbarMessage] = useState('');
// // //   const [openSnackbar, setOpenSnackbar] = useState(false);

// // //   useEffect(() => {
// // //     const fetchUserData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         const decodedToken = parseJwt(token);
// // //         const userRole = decodedToken.role;

// // //         setUserRole(userRole);

// // //         const response = await axios.get('https://lms-be-tk3j.onrender.com/api/leaves/all-list', {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`
// // //           }
// // //         });
// // //         const sortedLeaveRequests = response.data.leaveRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// // //         setLeaveRequests(sortedLeaveRequests);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setError(error.response.data.message);
// // //         setLoading(false);
// // //         setSnackbarMessage('Failed to fetch leave requests. Please try again.');
// // //         setOpenSnackbar(true);
// // //       }
// // //     };

// // //     fetchUserData();
// // //   }, []);

// // //   const handleSearch = (term) => {
// // //     setSearchTerm(term);
// // //   };

// // //   const filteredLeaveRequests = leaveRequests.filter(request =>
// // //     request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     request.status.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const handleStatusChange = async (leaveId, newStatus, comment) => {
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem('token');

// // //       const response = await axios.put(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/status`, { status: newStatus, comment }, {  //eslint-disable-line
// // //         headers: {
// // //           Authorization: `Bearer ${token}`
// // //         }
// // //       });

// // //       setLeaveRequests(prevLeaveRequests =>
// // //         prevLeaveRequests.map(request =>
// // //           request._id === leaveId ? { ...request, status: newStatus } : request
// // //         )
// // //       );

// // //       setSnackbarMessage('Leave request updated successfully');
// // //       setOpenSnackbar(true);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       setError(error.response.data.message);
// // //       setSnackbarMessage('Failed to update leave request. Please try again.');
// // //       setOpenSnackbar(true);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const parseJwt = (token) => {
// // //     try {
// // //       return JSON.parse(atob(token.split('.')[1]));
// // //     } catch (e) {
// // //       return null;
// // //     }
// // //   };

// // //   const indexOfLastItem = currentPage * itemsPerPage;
// // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //   const currentItems = filteredLeaveRequests.slice(indexOfFirstItem, indexOfLastItem);

// // //   const onPageChange = (pageNumber) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   const handleBulkAction = async (action, bulkComment) => {
// // //     setLoading(true);
// // //     try {
// // //       for (const leaveId of selectedLeaveIds) {
// // //         await handleStatusChange(leaveId, action, bulkComment);
// // //       }
// // //       setSelectedLeaveIds([]);
// // //       setBulkComment('');
// // //       setLoading(false);
// // //     } catch (error) {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSelectLeave = (leaveId) => {
// // //     if (selectedLeaveIds.includes(leaveId)) {
// // //       setSelectedLeaveIds(selectedLeaveIds.filter(id => id !== leaveId));
// // //     } else {
// // //       setSelectedLeaveIds([...selectedLeaveIds, leaveId]);
// // //     }
// // //   };

// // //   const handleCloseSnackbar = () => {
// // //     setOpenSnackbar(false);
// // //   };

// // //   return (
// // //     <div>
// // //       <Typography variant="h2" align="center" gutterBottom>Leave Request Approval</Typography>

// // //       <Search label="Search with name,type and status" onSearch={handleSearch} />

// // //       {loading && (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableBody>
// // //               {Array.from({ length: itemsPerPage }).map((_, index) => (
// // //                 <TableRow key={index}>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   {userRole === 'manager' && (
// // //                     <TableCell><Skeleton /></TableCell>
// // //                   )}
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}

// // //       {!loading && error && (
// // //         <Typography variant="h6" align="center" style={{ color: 'red' }}>{error}</Typography>
// // //       )}
      
// // //       {!loading && filteredLeaveRequests.length === 0 && (
// // //         <Typography variant="h6" align="center" style={{ color: 'grey' }}>No results found for '{searchTerm}'</Typography>
// // //       )}
      

// // //       {!loading && filteredLeaveRequests.length > 0 && (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>Name</TableCell>
// // //                 <TableCell>Start Date</TableCell>
// // //                 <TableCell>End Date</TableCell>
// // //                 <TableCell>Reason</TableCell>
// // //                 <TableCell>Type</TableCell>
// // //                 <TableCell>Number of Days</TableCell>
// // //                 <TableCell>Substitute</TableCell>
// // //                 <TableCell>Status</TableCell>
// // //                 {(userRole === 'manager' || userRole === 'admin') && <TableCell>Actions</TableCell>}
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {currentItems.map((request) => (
// // //                 <TableRow key={request._id}>
// // //                   <TableCell>{request.userName}</TableCell>
// // //                   <TableCell>{request.startDate}</TableCell>
// // //                   <TableCell>{request.endDate}</TableCell>
// // //                   <TableCell style={{ whiteSpace: 'pre-wrap' }}>
// // //                     {request.reason.length > 50 ? (
// // //                       <>
// // //                         {request.reason.slice(0, 50)}...
// // //                         <Button variant="text" color="primary" onClick={() => alert(request.reason)}>Read More</Button>
// // //                       </>
// // //                     ) : (
// // //                       request.reason
// // //                     )}
// // //                   </TableCell>
// // //                   <TableCell>{request.type}</TableCell>
// // //                   <TableCell>{request.numberOfDays}</TableCell>
// // //                   <TableCell>{request.substitute}</TableCell>
// // //                   <TableCell>{request.status}</TableCell>
// // //                   {(userRole === 'manager' || userRole === 'admin') && request.status !== 'approved' && request.status !== 'rejected' && (
// // //                     <TableCell>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="success"
// // //                         onClick={() => handleStatusChange(request._id, 'approved', comment)}
// // //                       >
// // //                         Approve
// // //                       </Button>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="error"
// // //                         onClick={() => handleStatusChange(request._id, 'rejected', comment)}
// // //                       >
// // //                         Reject
// // //                       </Button>
// // //                       <TextField
// // //                         label="Comment"
// // //                         variant="outlined"
// // //                         size="small"
// // //                         value={comment}
// // //                         onChange={(e) => setComment(e.target.value)}
// // //                       />
// // //                     </TableCell>
// // //                   )}
// // //                   {((userRole !== 'manager' && userRole !== 'admin') || (request.status === 'approved') || (request.status === 'rejected')) && (
// // //                     <TableCell>Buttons disabled</TableCell>
// // //                   )}
// // //                   {(userRole === 'manager' || userRole === 'admin') && (
// // //                     <TableCell>
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={selectedLeaveIds.includes(request._id)}
// // //                         onChange={() => handleSelectLeave(request._id)}
// // //                       />
// // //                     </TableCell>
// // //                   )}
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}

// // //       <Box display="flex" justifyContent="center" mt={2}>
// // //         <Pagination
// // //           currentPage={currentPage}
// // //           totalPages={Math.ceil(filteredLeaveRequests.length / itemsPerPage)}
// // //           onPageChange={onPageChange}
// // //         />
// // //       </Box>

// // //       {(userRole === 'manager' || userRole === 'admin') && (
// // //         <Box display="flex" justifyContent="center" mt={2}>
// // //           <Button
// // //             variant="contained"
// // //             color="success"
// // //             disabled={selectedLeaveIds.length === 0}
// // //             onClick={() => handleBulkAction('approved', bulkComment)}
// // //           >
// // //             Approve Selected
// // //           </Button>
// // //           <Button
// // //             variant="contained"
// // //             color="error"
// // //             disabled={selectedLeaveIds.length === 0}
// // //             onClick={() => handleBulkAction('rejected', bulkComment)}
// // //           >
// // //             Reject Selected
// // //           </Button>
// // //           <TextField
// // //             label="Bulk Comment"
// // //             variant="outlined"
// // //             size="small"
// // //             value={bulkComment}
// // //             onChange={(e) => setBulkComment(e.target.value)}
// // //           />
// // //         </Box>
// // //       )}

// // //       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
// // //     </div>
// // //   );
// // // };

// // // export default LeaveApproval;












// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Box, Snackbar } from '@mui/material';
// // // import Skeleton from 'react-loading-skeleton';
// // // import Pagination from './Pagination';
// // // import Search from './Search';

// // // const LeaveApproval = () => {
// // //   const [leaveRequests, setLeaveRequests] = useState([]);
// // //   const [userRole, setUserRole] = useState('');
// // //   const [comment, setComment] = useState('');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 5;
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [selectedLeaveIds, setSelectedLeaveIds] = useState([]);
// // //   const [bulkComment, setBulkComment] = useState('');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [snackbarMessage, setSnackbarMessage] = useState('');
// // //   const [openSnackbar, setOpenSnackbar] = useState(false);

// // //   useEffect(() => {
// // //     const fetchUserData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         const decodedToken = parseJwt(token);
// // //         const userRole = decodedToken.role;

// // //         setUserRole(userRole);

// // //         const response = await axios.get('https://lms-be-tk3j.onrender.com/api/leaves/all-list', {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`
// // //           }
// // //         });
// // //         const sortedLeaveRequests = response.data.leaveRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// // //         setLeaveRequests(sortedLeaveRequests);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setError(error.response.data.message);
// // //         setLoading(false);
// // //         setSnackbarMessage('Failed to fetch leave requests. Please try again.');
// // //         setOpenSnackbar(true);
// // //       }
// // //     };

// // //     fetchUserData();
// // //   }, []);

// // //   const handleSearch = (term) => {
// // //     setSearchTerm(term);
// // //   };

// // //   const filteredLeaveRequests = leaveRequests.filter(request =>
// // //     request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     request.status.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const handleStatusChange = async (leaveId, newStatus, comment) => {
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem('token');

// // //       const response = await axios.put(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/status`, { status: newStatus, comment }, {  //eslint-disable-line
// // //         headers: {
// // //           Authorization: `Bearer ${token}`
// // //         }
// // //       });

// // //       setLeaveRequests(prevLeaveRequests =>
// // //         prevLeaveRequests.map(request =>
// // //           request._id === leaveId ? { ...request, status: newStatus } : request
// // //         )
// // //       );

// // //       setSnackbarMessage('Leave request updated successfully');
// // //       setOpenSnackbar(true);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       setError(error.response.data.message);
// // //       setSnackbarMessage('Failed to update leave request. Please try again.');
// // //       setOpenSnackbar(true);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const parseJwt = (token) => {
// // //     try {
// // //       return JSON.parse(atob(token.split('.')[1]));
// // //     } catch (e) {
// // //       return null;
// // //     }
// // //   };

// // //   const indexOfLastItem = currentPage * itemsPerPage;
// // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //   const currentItems = filteredLeaveRequests.slice(indexOfFirstItem, indexOfLastItem);

// // //   const onPageChange = (pageNumber) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   const handleBulkAction = async (action, bulkComment) => {
// // //     setLoading(true);
// // //     try {
// // //       for (const leaveId of selectedLeaveIds) {
// // //         await handleStatusChange(leaveId, action, bulkComment);
// // //       }
// // //       setSelectedLeaveIds([]);
// // //       setBulkComment('');
// // //       setLoading(false);
// // //     } catch (error) {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSelectLeave = (leaveId) => {
// // //     if (selectedLeaveIds.includes(leaveId)) {
// // //       setSelectedLeaveIds(selectedLeaveIds.filter(id => id !== leaveId));
// // //     } else {
// // //       setSelectedLeaveIds([...selectedLeaveIds, leaveId]);
// // //     }
// // //   };

// // //   const handleCloseSnackbar = () => {
// // //     setOpenSnackbar(false);
// // //   };

// // //   const handleDeleteLeave = async (leaveId) => {
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       await axios.delete(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/delete`, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`
// // //         }
// // //       });

// // //       setLeaveRequests(prevLeaveRequests =>
// // //         prevLeaveRequests.filter(request => request._id !== leaveId)
// // //       );

// // //       setSnackbarMessage('Leave request deleted successfully');
// // //       setOpenSnackbar(true);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       setError(error.response.data.message);
// // //       setSnackbarMessage('Failed to delete leave request. Please try again.');
// // //       setOpenSnackbar(true);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <Typography variant="h2" align="center" gutterBottom>Leave Request Approval</Typography>

// // //       <Search label="Search with name,type and status" onSearch={handleSearch} />

// // //       {loading && (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableBody>
// // //               {Array.from({ length: itemsPerPage }).map((_, index) => (
// // //                 <TableRow key={index}>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   <TableCell><Skeleton /></TableCell>
// // //                   {(userRole === 'manager' || userRole === 'admin') && (
// // //                     <TableCell><Skeleton /></TableCell>
// // //                   )}
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}

// // //       {!loading && error && (
// // //         <Typography variant="h6" align="center" style={{ color: 'red' }}>{error}</Typography>
// // //       )}
      
// // //       {!loading && filteredLeaveRequests.length === 0 && (
// // //         <Typography variant="h6" align="center" style={{ color: 'grey' }}>No results found for '{searchTerm}'</Typography>
// // //       )}
      

// // //       {!loading && filteredLeaveRequests.length > 0 && (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>Name</TableCell>
// // //                 <TableCell>Start Date</TableCell>
// // //                 <TableCell>End Date</TableCell>
// // //                 <TableCell>Reason</TableCell>
// // //                 <TableCell>Type</TableCell>
// // //                 <TableCell>Number of Days</TableCell>
// // //                 <TableCell>Substitute</TableCell>
// // //                 <TableCell>Status</TableCell>
// // //                 {(userRole === 'manager' || userRole === 'admin') && <TableCell>Actions</TableCell>}
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {currentItems.map((request) => (
// // //                 <TableRow key={request._id}>
// // //                   <TableCell>{request.userName}</TableCell>
// // //                   <TableCell>{request.startDate}</TableCell>
// // //                   <TableCell>{request.endDate}</TableCell>
// // //                   <TableCell style={{ whiteSpace: 'pre-wrap' }}>
// // //                     {request.reason.length > 50 ? (
// // //                       <>
// // //                         {request.reason.slice(0, 50)}...
// // //                         <Button variant="text" color="primary" onClick={() => alert(request.reason)}>Read More</Button>
// // //                       </>
// // //                     ) : (
// // //                       request.reason
// // //                     )}
// // //                   </TableCell>
// // //                   <TableCell>{request.type}</TableCell>
// // //                   <TableCell>{request.numberOfDays}</TableCell>
// // //                   <TableCell>{request.substitute}</TableCell>
// // //                   <TableCell>{request.status}</TableCell>
// // //                   {(userRole === 'manager' || userRole === 'admin') && request.status !== 'approved' && request.status !== 'rejected' && (
// // //                     <TableCell>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="success"
// // //                         onClick={() => handleStatusChange(request._id, 'approved', comment)}
// // //                       >
// // //                         Approve
// // //                       </Button>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="error"
// // //                         onClick={() => handleStatusChange(request._id, 'rejected', comment)}
// // //                       >
// // //                         Reject
// // //                       </Button>
// // //                       <TextField
// // //                         label="Comment"
// // //                         variant="outlined"
// // //                         size="small"
// // //                         value={comment}
// // //                         onChange={(e) => setComment(e.target.value)}
// // //                       />
// // //                     </TableCell>
// // //                   )}
// // //                   {((userRole !== 'manager' && userRole !== 'admin') || (request.status === 'approved') || (request.status === 'rejected')) && (
// // //                     <TableCell>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="error"
// // //                         onClick={() => handleDeleteLeave(request._id)}
// // //                       >
// // //                         Delete
// // //                       </Button>
// // //                     </TableCell>
// // //                   )}
// // //                   {(userRole === 'manager' || userRole === 'admin') && (
// // //                     <TableCell>
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={selectedLeaveIds.includes(request._id)}
// // //                         onChange={() => handleSelectLeave(request._id)}
// // //                       />
// // //                     </TableCell>
// // //                   )}
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}

// // //       <Box display="flex" justifyContent="center" mt={2}>
// // //         <Pagination
// // //           currentPage={currentPage}
// // //           totalPages={Math.ceil(filteredLeaveRequests.length / itemsPerPage)}
// // //           onPageChange={onPageChange}
// // //         />
// // //       </Box>

// // //       {(userRole === 'manager' || userRole === 'admin') && (
// // //         <Box display="flex" justifyContent="center" mt={2}>
// // //           <Button
// // //             variant="contained"
// // //             color="success"
// // //             disabled={selectedLeaveIds.length === 0}
// // //             onClick={() => handleBulkAction('approved', bulkComment)}
// // //           >
// // //             Approve Selected
// // //           </Button>
// // //           <Button
// // //             variant="contained"
// // //             color="error"
// // //             disabled={selectedLeaveIds.length === 0}
// // //             onClick={() => handleBulkAction('rejected', bulkComment)}
// // //           >
// // //             Reject Selected
// // //           </Button>
// // //           <TextField
// // //             label="Bulk Comment"
// // //             variant="outlined"
// // //             size="small"
// // //             value={bulkComment}
// // //             onChange={(e) => setBulkComment(e.target.value)}
// // //           />
// // //         </Box>
// // //       )}

// // //       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
// // //     </div>
// // //   );
// // // };

// // // export default LeaveApproval;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Box, Snackbar } from '@mui/material';
// import Skeleton from 'react-loading-skeleton';
// import Pagination from './Pagination';
// import Search from './Search';

// const LeaveApproval = () => {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [userRole, setUserRole] = useState('');
//   const [comment, setComment] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedLeaveIds, setSelectedLeaveIds] = useState([]);
//   const [bulkComment, setBulkComment] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
 


//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const decodedToken = parseJwt(token);
//         const userRole = decodedToken.role;

//         setUserRole(userRole);

//         const response = await axios.get('https://lms-be-tk3j.onrender.com/api/leaves/all-list', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const sortedLeaveRequests = response.data.leaveRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setLeaveRequests(sortedLeaveRequests);
//         setLoading(false);
//       } catch (error) {
//         setError(error.response.data.message);
//         setLoading(false);
//         setSnackbarMessage('Failed to fetch leave requests. Please try again.');
//         setOpenSnackbar(true);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const filteredLeaveRequests = leaveRequests.filter(request =>
//     request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     request.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleStatusChange = async (leaveId, newStatus, comment) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');

//       const response = await axios.put(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/status`, { status: newStatus, comment }, {  //eslint-disable-line
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setLeaveRequests(prevLeaveRequests =>
//         prevLeaveRequests.map(request =>
//           request._id === leaveId ? { ...request, status: newStatus } : request
//         )
//       );

//       setSnackbarMessage('Leave request updated successfully');
//       setOpenSnackbar(true);
//       setLoading(false);
//     } catch (error) {
//       setError(error.response.data.message);
//       setSnackbarMessage('Failed to update leave request. Please try again.');
//       setOpenSnackbar(true);
//       setLoading(false);
//     }
//   };

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredLeaveRequests.slice(indexOfFirstItem, indexOfLastItem);

//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleBulkAction = async (action, bulkComment) => {
//     setLoading(true);
//     try {
//       for (const leaveId of selectedLeaveIds) {
//         await handleStatusChange(leaveId, action, bulkComment);
//       }
//       setSelectedLeaveIds([]);
//       setBulkComment('');
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const handleSelectLeave = (leaveId) => {
//     if (selectedLeaveIds.includes(leaveId)) {
//       setSelectedLeaveIds(selectedLeaveIds.filter(id => id !== leaveId));
//     } else {
//       setSelectedLeaveIds([...selectedLeaveIds, leaveId]);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const handleDeleteLeave = async (leaveId) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`https://lms-be-tk3j.onrender.com/api/leaves/${leaveId}/delete`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setLeaveRequests(prevLeaveRequests =>
//         prevLeaveRequests.filter(request => request._id !== leaveId)
//       );

//       setSnackbarMessage('Leave request deleted successfully');
//       setOpenSnackbar(true);
//       setLoading(false);
//     } catch (error) {
//       setError(error.response.data.message);
//       setSnackbarMessage('Failed to delete leave request. Please try again.');
//       setOpenSnackbar(true);
//       setLoading(false);
//     }
//   };

//   const handleDeleteAll = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete('https://lms-be-tk3j.onrender.com/api/leaves/delete-all', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setLeaveRequests([]);
//       setSnackbarMessage('All leave requests deleted successfully');
//       setOpenSnackbar(true);
//       setLoading(false);
//     } catch (error) {
//       setError(error.response.data.message);
//       setSnackbarMessage('Failed to delete all leave requests. Please try again.');
//       setOpenSnackbar(true);
//       setLoading(false);
//     }
//   };


 
  

//   return (
//     <div>
//       <Typography variant="h2" align="center" gutterBottom>Leave Request Approval</Typography>

//       <Search label="Search with name,type and status" onSearch={handleSearch} />

//       {loading && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableBody>
//               {Array.from({ length: itemsPerPage }).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   <TableCell><Skeleton /></TableCell>
//                   {(userRole === 'manager' || userRole === 'admin') && (
//                     <TableCell><Skeleton /></TableCell>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {!loading && error && (
//         <Typography variant="h6" align="center" style={{ color: 'red' }}>{error}</Typography>
//       )}
      
//       {!loading && filteredLeaveRequests.length === 0 && (
//         <Typography variant="h6" align="center" style={{ color: 'grey' }}>No results found for '{searchTerm}'</Typography>
//       )}
      

//       {!loading && filteredLeaveRequests.length > 0 && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Start Date</TableCell>
//                 <TableCell>End Date</TableCell>
//                 <TableCell>Reason</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Number of Days</TableCell>
//                 <TableCell>Substitute</TableCell>
//                 <TableCell>Status</TableCell>
//                 {(userRole === 'manager' || userRole === 'admin') && <TableCell>Actions</TableCell>}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentItems.map((request) => (
//                 <TableRow key={request._id}>
//                   <TableCell>{request.userName}</TableCell>
//                   <TableCell>{request.startDate}</TableCell>
//                   <TableCell>{request.endDate}</TableCell>
//                   <TableCell style={{ whiteSpace: 'pre-wrap' }}>
//                     {request.reason.length > 50 ? (
//                       <>
//                         {request.reason.slice(0, 50)}...
//                         <Button variant="text" color="primary" onClick={() => alert(request.reason)}>Read More</Button>
//                       </>
//                     ) : (
//                       request.reason
//                     )}
//                   </TableCell>
//                   <TableCell>{request.type}</TableCell>
//                   <TableCell>{request.numberOfDays}</TableCell>
//                   <TableCell>{request.substitute}</TableCell>
//                   <TableCell>{request.status}</TableCell>
//                   {(userRole === 'manager' || userRole === 'admin') && request.status !== 'approved' && request.status !== 'rejected' && (
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={() => handleStatusChange(request._id, 'approved', comment)}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleStatusChange(request._id, 'rejected', comment)}
//                       >
//                         Reject
//                       </Button>
//                       <TextField
//                         label="Comment"
//                         variant="outlined"
//                         size="small"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                       />
//                     </TableCell>
//                   )}
//                   {((userRole !== 'manager' && userRole !== 'admin') || (request.status === 'approved') || (request.status === 'rejected')) && (
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDeleteLeave(request._id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   )}
//                   {(userRole === 'manager' || userRole === 'admin') && (
//                     <TableCell>
//                       <input
//                         type="checkbox"
//                         checked={selectedLeaveIds.includes(request._id)}
//                         onChange={() => handleSelectLeave(request._id)}
//                       />
//                     </TableCell>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box display="flex" justifyContent="center" mt={2}>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(filteredLeaveRequests.length / itemsPerPage)}
//           onPageChange={onPageChange}
//         />
//       </Box>

//       {(userRole === 'manager' || userRole === 'admin') && (
//         <Box display="flex" justifyContent="center" mt={2}>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteAll}
//             disabled={leaveRequests.length === 0}
//           >
//             Delete All
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             disabled={selectedLeaveIds.length === 0}
//             onClick={() => handleBulkAction('approved', bulkComment)}
//           >
//             Approve Selected
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             disabled={selectedLeaveIds.length === 0}
//             onClick={() => handleBulkAction('rejected', bulkComment)}
//           >
//             Reject Selected
//           </Button>
//           <TextField
//             label="Bulk Comment"
//             variant="outlined"
//             size="small"
//             value={bulkComment}
//             onChange={(e) => setBulkComment(e.target.value)}
//           />
//         </Box>
//       )}

//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
//     </div>
//   );
// };

// export default LeaveApproval;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);

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
        setSnackbarMessage('Failed to fetch leave requests. Please try again.');
        setOpenSnackbar(true);
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

      setSnackbarMessage('Leave request updated successfully');
      setOpenSnackbar(true);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setSnackbarMessage('Failed to update leave request. Please try again.');
      setOpenSnackbar(true);
      setLoading(false);
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDeleteLeave = async (leaveId) => {
    setDeleteId(leaveId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDeleteLeave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lms-be-tk3j.onrender.com/api/leaves/${deleteId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLeaveRequests(prevLeaveRequests =>
        prevLeaveRequests.filter(request => request._id !== deleteId)
      );

      setSnackbarMessage('Leave request deleted successfully');
      setOpenSnackbar(true);
      setLoading(false);
      setOpenDeleteDialog(false);
    } catch (error) {
      setError(error.response.data.message);
      setSnackbarMessage('Failed to delete leave request. Please try again.');
      setOpenSnackbar(true);
      setLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  const handleDeleteAll = async () => {
    setOpenDeleteAllDialog(true);
  };

  const handleConfirmDeleteAll = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://lms-be-tk3j.onrender.com/api/leaves/delete-all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLeaveRequests([]);
      setSnackbarMessage('All leave requests deleted successfully');
      setOpenSnackbar(true);
      setLoading(false);
      setOpenDeleteAllDialog(false);
    } catch (error) {
      setError(error.response.data.message);
      setSnackbarMessage('Failed to delete all leave requests. Please try again.');
      setOpenSnackbar(true);
      setLoading(false);
      setOpenDeleteAllDialog(false);
    }
  };

  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>Leave Request Approval</Typography>

      <Search label="Search with name,type and status" onSearch={handleSearch} />

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
                  {(userRole === 'manager' || userRole === 'admin') && (
                    <TableCell><Skeleton /></TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && error && (
        <Typography variant="h6" align="center" style={{ color: 'red' }}>{error}</Typography>
      )}
      
      {!loading && filteredLeaveRequests.length === 0 && (
        <Typography variant="h6" align="center" style={{ color: 'grey' }}>No results found for '{searchTerm}'</Typography>
      )}
      

      {!loading && filteredLeaveRequests.length > 0 && (
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
                    color="error"
                    onClick={() => handleDeleteLeave(request._id)}
                  >
                    Delete
                  </Button>
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
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteLeave(request._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
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

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredLeaveRequests.length / itemsPerPage)}
          onPageChange={onPageChange}
        />
      </Box>

      {(userRole === 'manager' || userRole === 'admin') && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAll}
            disabled={leaveRequests.length === 0}
          >
            Delete All
          </Button>
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

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Leave Request</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this leave request?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDeleteLeave} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteAllDialog} onClose={() => setOpenDeleteAllDialog(false)}>
        <DialogTitle>Delete All Leave Requests</DialogTitle>
        <DialogContent>
          Are you sure you want to delete all leave requests?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteAllDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDeleteAll} color="error">Delete All</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LeaveApproval;
