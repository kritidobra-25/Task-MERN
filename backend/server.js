const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./connect/database");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 8000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));