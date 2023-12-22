
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('./db');
require('dotenv').config();

const { corsOptions, errorHandler } = require('./middleware');

const { Task } = require('./model');

const taskRoutes = require('./taskRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes

app.use('/', taskRoutes);

// Error handling middleware
app.use(errorHandler);

// Home route
app.get('/', (req, res) => {
  res.send('Task management server is running!');
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
