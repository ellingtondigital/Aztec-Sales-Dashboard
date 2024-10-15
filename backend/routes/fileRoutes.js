// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController'); // Adjust the path as necessary

// File handling routes
router.post('/upload', fileController.upload.single('file'), fileController.uploadFile);
router.get('/last-uploaded', fileController.getLastUploaded);
router.get('/files/:fileName', fileController.getFileData);

module.exports = router;
