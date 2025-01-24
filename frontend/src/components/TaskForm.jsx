import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the path as needed
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TaskForm = ({ handleTaskSubmit , editingTask }) => {
  const { token } = useAuth(); // Use the token directly from context
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (task._id) {
        await axios.put(`${backendUrl}tasks/${task._id}`, task, { headers });
      } else {
        await axios.post(`${backendUrl}tasks`, task, { headers });
      }

      handleTaskSubmit(); // Notify parent to refresh the task list
      setTask({ title: "", description: "", dueDate: "", status: "pending" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit task");
    }
  };

  const handleDelete = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (task._id) {
        await axios.delete(`${backendUrl}tasks/${task._id}`, { headers });
        handleTaskSubmit();
        setTask({ title: "", description: "", dueDate: "", status: "pending" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shadow bg-gray-800 p-4 rounded-lg w-full">
      <h3 className="mb-4 text-lg font-bold">{task._id ? "Edit Task" : "New Task"}</h3>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="w-full">
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
      </div>
      <div className="flex gap-4 grid  sm:grid-cols-1 lg:grid-cols-2">
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded text-gray-600"
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded text-gray-600"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded">
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
