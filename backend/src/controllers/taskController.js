const Task = require("../models/Task");

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.create({ title, description, dueDate, status, user: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { id } = req.params; // Get task ID from URL parameters
  const { title, description, dueDate, status } = req.body; // Fields to update
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Ensure the task belongs to the authenticated user
      { title, description, dueDate, status },
      { new: true, runValidators: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params; // Get task ID from URL parameters
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id }); // Ensure the task belongs to the authenticated user

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
