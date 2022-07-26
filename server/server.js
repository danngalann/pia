const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// App definition
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const configRouter = require('./routes/config');
app.use('/config', configRouter);

const incidentsRouter = require('./routes/incidents');
app.use('/incidents', incidentsRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
