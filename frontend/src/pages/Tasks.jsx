import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import logo from '../assets/fevicon.svg';

const Tasks = () => {
  const { user, logout } = useAuth();
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [refreshKey, setRefreshKey] = useState(0); // Trigger a refresh of TaskList


  const handleTaskSubmit = () => {
    setEditingTask(null); // Reset editing task after submission
    setRefreshKey((prev) => prev + 1); // Trigger TaskList refresh
  };

  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task to edit
  };

  return (
    <div className="px-10  py-10   h-screen bg-gradient-to-br from-gray-800 via-black to-gray-800 text-white  ">

<div className="flex justify-center mb-4  ">
    <img src={logo} alt="Logo" className="h-24 w-auto" />
  </div>
        <h1 className="text-xl font-bold"></h1>
      <div className="flex justify-between mb-4">
        <h1 className="flex justify-center text-xl font-bold">Welcome, {user}</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
      <TaskForm existingTask={editingTask} onTaskSubmit={handleTaskSubmit} />
      <TaskList key={refreshKey} onEditTask={handleEditTask} />
    </div>
  );
};

export default Tasks;
