// fileController.js

const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const mysql = require('mysql2');
const config = require('../config'); // Adjust path if needed

// MySQL Connection
const connection = mysql.createConnection(config.mysql);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL.');
});

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Function to handle file upload
exports.uploadFile = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = xlsx.readFile(file.path);
  const sheetNames = workbook.SheetNames;

  const sheetData = {};
  sheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    sheetData[sheetName] = data;
  });

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
};

// Function to get the most recent file
exports.getLastUploaded = (req, res) => {
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
};

// Function to get records for a specific file name
exports.getFileData = (req, res) => {
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
};

// Export multer upload setup for routes
exports.upload = upload;
