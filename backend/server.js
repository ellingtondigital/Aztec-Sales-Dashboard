
// const express = require('express');
// const multer = require('multer');
// const xlsx = require('xlsx');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // Variable to store the data from the last uploaded file
// let lastFileData = {};

// // Upload endpoint
// app.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const workbook = xlsx.readFile(file.path);
//   const sheetNames = workbook.SheetNames;

//   // Fetch data from all sheets
//   const sheetData = {};
//   sheetNames.forEach(sheetName => {
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // Read entire sheet

//     sheetData[sheetName] = data;
//   });

//   // Store data from the uploaded file in memory
//   lastFileData = sheetData;

//   res.json(sheetData);
// });

// // Endpoint to get the data of the last uploaded file
// app.get('/last-uploaded', (req, res) => {
//   if (Object.keys(lastFileData).length === 0) {
//     return res.status(404).send('No file data available.');
//   }
//   res.json(lastFileData);
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



//-------------------------------------------------------------------
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const config = require('./config'); // Import the configuration file

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL.');
});


// Hardcoded credentials
const hardcodedUser = {
  username: 'test@gmail.com',
  password: '123456'
};

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    const sql = 'INSERT INTO user_logins (username) VALUES (?) ON DUPLICATE KEY UPDATE login_timestamp = CURRENT_TIMESTAMP';
    connection.query(sql, [username], (err) => {
      if (err) {
        console.error('Error updating login timestamp in MySQL:', err);
        return res.status(500).send('Error updating login timestamp.');
      }
      res.json({ message: 'Login successful' });
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = xlsx.readFile(file.path);
  const sheetNames = workbook.SheetNames;

  // Fetch data from all sheets
  const sheetData = {};
  sheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // Read entire sheet

    sheetData[sheetName] = data;
  });

  // Save each sheet's data as a separate record in the database
  sheetNames.forEach(sheetName => {
    const data = sheetData[sheetName].map(row => row.join(',')).join('\n');
    const sql = 'INSERT INTO uploaded_files (file_name, sheet_name, row_data) VALUES (?, ?, ?)';
    const values = [file.filename, sheetName, data];

    connection.query(sql, values, (err) => {
      if (err) {
        console.error('Error saving data to MySQL:', err);
      }
    });
  });

  res.json(sheetData);
});

// // Endpoint to get the data of the last uploaded file
// app.get('/last-uploaded', (req, res) => {
//   const sql = 'SELECT * FROM uploaded_files ORDER BY uploaded_at DESC LIMIT 1';

//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching data from MySQL:', err);
//       return res.status(500).send('Error fetching file data.');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('No file data available.');
//     }
//     const fileData = results[0];
//     const rows = fileData.row_data.split('\n').map(row => row.split(','));
//     res.json({ [fileData.sheet_name]: rows });
//   });
// });

// Endpoint to get the most recent file name and its associated records
app.get('/last-uploaded', (req, res) => {
  const sql = 'SELECT * FROM uploaded_files ORDER BY uploaded_at DESC LIMIT 1';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).send('Error fetching file data.');
    }

    if (results.length === 0) {
      return res.status(404).send('No file data available.');
    }

    const fileData = results[0];
    const rows = fileData.row_data.split('\n').map(row => row.split(','));

    res.json({
      fileName: fileData.file_name,
      sheetName: fileData.sheet_name,
      rows: rows
    });
  });
});

// Endpoint to get records for a specific file name
app.get('/files/:fileName', (req, res) => {
  const { fileName } = req.params;

  const sql = 'SELECT * FROM uploaded_files WHERE file_name = ? ORDER BY uploaded_at DESC';

  connection.query(sql, [fileName], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).send('Error fetching file data.');
    }

    if (results.length === 0) {
      return res.status(404).send('No file data available for the given file name.');
    }

    const processedResults = results.map(result => {
      const rows = result.row_data.split('\n').map(row => row.split(','));
      return {
        sheet_name: result.sheet_name,
        rows: rows
      };
    });

    res.json(processedResults);
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
