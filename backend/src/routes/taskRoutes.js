const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Route to get all tasks
router.get("/", protect, getTasks);

// Route to create a new task
router.post("/", protect, createTask);

// Route to update a task by ID
router.put("/:id", protect, updateTask);

// Route to delete a task by ID
router.delete("/:id", protect, deleteTask);

module.exports = router;
