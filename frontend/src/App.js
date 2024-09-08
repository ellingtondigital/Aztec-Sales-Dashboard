
// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import { Container } from 'react-bootstrap';
import FileUpload from './Screen/FileUpload';
import NavigationBar from './Screen/Navbar';
import Dashboard from './Screen/Dashboard';
import { UploadedDataProvider } from './context/UploadedDataContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploadedData, setUploadedData] = useState({});

  useEffect(() => {
    // Check localStorage for authentication status on component mount
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Set auth status in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove auth status from localStorage
  };

  const handleFileUploadSuccess = (data) => {
    setUploadedData(data);
  };

  return (
    <UploadedDataProvider>
      <Router>
        {/* Conditionally render the NavigationBar only if the user is authenticated */}
        {isAuthenticated && <NavigationBar />}
        <Container>
          <Routes>
            {/* Redirect authenticated users away from login */}
            <Route 
              path="/" 
              element={isAuthenticated 
                ? <Navigate to="/file-upload" /> 
                : <Login onLogin={handleLogin} />} 
            />
            {/* Redirect to login if trying to access a protected route without authentication */}
            <Route 
              path="/file-upload" 
              element={isAuthenticated 
                ? <FileUpload onFileUploadSuccess={handleFileUploadSuccess} /> 
                : <Navigate to="/" />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated 
                ? <Dashboard /> 
                : <Navigate to="/" />} 
            />
            {/* Add other routes as needed */}
          </Routes>
        </Container>
      </Router>
    </UploadedDataProvider>
  );
}

export default App;
