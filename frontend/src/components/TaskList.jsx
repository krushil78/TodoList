
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const TaskList = ({ onEditTask }) => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err.response?.data?.message || err.message);
      }
    };
    fetchTasks();
  }, [backendUrl, token]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${backendUrl}tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (task) => {
    onEditTask(task);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 mb-4 bg-gray-800 rounded shadow">
          <h3 className="font-bold">Task : {task.title}</h3>
          <p className="font-bold">Description : {task.description}</p>
          <p className="folt-bold">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p className="folt-bold">Status: {task.status}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleEdit(task)}
              className="px-4 py-2 text-white bg-yellow-500 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="px-4 py-2 text-white bg-red-500 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
