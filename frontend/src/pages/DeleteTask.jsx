import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

const DeleteTask = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_SERVER_PORT || 5000;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/api/tasks/${id}`)
      .then((res) => {
        setTask(res.data.task);
        setLoading(false);
        console.log("Data fetched successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("Can't fetch data");
      });
  }, [id]);

  const handleDeleteTask = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setLoading(false);
        console.log("Task deleted successfully");
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert("Can't delete task! Try again.");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 py-8 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-sky-700 mb-4">Delete Task</h1>
        
        {loading ? (
          <p className="text-sky-700 font-semibold">Loading...</p>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Task Details</h2>
              <p className="text-gray-600 mt-2"><strong>Title:</strong> {task.title || "No Title Available"}</p>
              <p className="text-gray-600"><strong>Description:</strong> {task.description || "No Description Available"}</p>
              <p className="text-gray-600"><strong>Status:</strong> {task.completed ? "Completed" : "Pending"}</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-600">Are you sure you want to delete this task? This action cannot be undone.</p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleDeleteTask}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Yes, delete it
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteTask;