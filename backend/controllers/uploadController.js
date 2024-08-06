const express = require('express');
const uploadController = express.Router();
const multer = require('multer');
const { verifyToken } = require('../middlewares/verifyToken');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename || file.originalname); // Default to original file name if no filename is provided in body
    }
});

const upload = multer({ storage });

uploadController.post('/image', verifyToken, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        return res.status(201).json({ msg: "Successfully uploaded file" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "An error occurred during the file upload" });
    }
});

module.exports = uploadController;
