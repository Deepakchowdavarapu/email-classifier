const express = require('express');
const multer = require('multer');
const path = require('path');
const { sendEmail, fetchEmails , scheduleEmail} = require('../services/emailService');
const Email = require('../models/emailSchema');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Route to send an email with optional HTML and attachments
router.post('/send', async (req, res) => {
  const { to, subject, body, htmlBody } = req.body;
  
  try {
    // const attachments = req.files ? req.files.map(file => ({
    //   filename: file.originalname,
    //   path: file.path,
    //   contentType: file.mimetype
    // })) : [];

    const result = await sendEmail(to, subject, body, htmlBody);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch emails
router.get('/fetch', async (req, res) => {
  try {
    const emails = await fetchEmails();
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).send(`Error fetching emails: ${error.message}`);
  }
});

router.post('/schedule', (req, res) => {
  const { to, subject, body, sendTime } = req.body;

  try {
    scheduleEmail(to, subject, body, sendTime);
    console.log(`its working`)
    res.status(200).json({ message: 'Email scheduled successfully' });
  } catch (err) {
    console.log('Error scheduling email:', err);
    res.status(500).json({ error: 'Error scheduling email' });
  }
});

module.exports = router;