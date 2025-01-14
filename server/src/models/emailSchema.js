const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: String,
  sender: String,
  recipient: String,
  body: String,
  htmlBody: String,
  timestamp: Date
});

module.exports = mongoose.model('Email', emailSchema);