const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');
const cors = require('cors');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Register routes
app.use('/emails', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});