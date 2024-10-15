
//-------------------------------------------------------------------
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const config = require('./config'); // Import the configuration file

const loginRoutes = require('./routes/loginRoutes'); // Import the login routes
const fileRoutes = require('./routes/fileRoutes'); // Import the file handling routes
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Use the login routes
app.use('/', loginRoutes); // This will map the routes defined in loginRoutes.js
app.use('/', fileRoutes);
app.use('/auth', authRoutes);

// MySQL Connection
const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL.');
});


// Start server
app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
