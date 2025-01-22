import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the path as needed
import axios from "axios";

const TaskForm = ({ onTaskSubmit, existingTask }) => {
  const { token } = useAuth(); // Use the token directly from context
  const [task, setTask] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Populate form with existing task data for editing
  useEffect(() => {
    if (existingTask) {
      setTask(existingTask);
    }
  }, [existingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (task._id) {
        // Update existing task
        await axios.put(`${backendUrl}tasks/${task._id}`, task, { headers });
      } else {
        // Create new task
        await axios.post(`${backendUrl}tasks`, task, { headers });
      }

      onTaskSubmit(); // Notify parent to refresh the task list
      setTask({ title: "", description: "" }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit task");
    }
  };

  const handleDelete = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (task._id) {
        // Delete the task
        await axios.delete(`${backendUrl}tasks/${task._id}`, { headers });
        onTaskSubmit(); // Notify parent to refresh the task list
        setTask({ title: "", description: "" }); // Reset form
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" shadow bg-gray-800 p-4 rounded-lg  w-full">
      <h3 className="mb-4 text-lg font-bold">{task._id ? "Edit Task" : "New Task"}</h3>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded text-gray-600"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded text-gray-600"
        rows="4"
      />
      <div className="flex gap-2">
        <button type="submit" className="w-full py-2 text-white bg-green-500 rounded  rounded-lg bg-purple-600 hover:bg-purple-500 ">
          {task._id ? "Update Task" : "Create Task"}
        </button>
        {task._id && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2 text-white bg-red-500 rounded"
          >
            Delete Task
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
