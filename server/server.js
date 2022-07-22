const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// App definition
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
