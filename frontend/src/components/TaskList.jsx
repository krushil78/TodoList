import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TaskList = ({ onEditTask }) => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
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
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task._id); // Set the task being edited
    onEditTask(task); // Trigger the edit action passed as a prop
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 mb-4 bg-gray-800 rounded shadow">
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm text-gray-400">{task.description}</p>
          <div className="flex gap-2 mt-2">
            <button
             onClick={() => handleEdit(task)}
              className="px-4 py-2 text-white bg-yellow-500 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className={`px-4 py-2 text-white bg-red-500 rounded ${editingTask === task._id ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={editingTask === task._id} // Disable delete button if the task is being edited
            >              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
