const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');
const { errorHandler } = require('./middlewares/errorMiddleware');

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Middlewares
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

