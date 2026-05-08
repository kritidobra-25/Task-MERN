const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler((req, res) => {
  res.status(200).json({ message: "Get All Task" });
});

const setTask = asyncHandler((req, res) => {
  res.status(200).json({ message: "Create Task" });
});

const updateTask = asyncHandler((req, res) => {
  res.status(200).json({ message: `Task ${req.params.id} updated.` });
});

const deleteTask = asyncHandler((req, res) => {
  res.status(200).json({ message: `Task ${req.params.id} deleted.` });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };