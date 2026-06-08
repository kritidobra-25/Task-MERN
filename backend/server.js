const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');
const { errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
