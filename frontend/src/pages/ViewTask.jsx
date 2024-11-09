import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

const ViewTask = () => {
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const PORT = import.meta.env.VITE_SERVER_PORT || 5000;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/api/tasks/${id}`)
      .then((res) => {
        setTask(res.data.task);
        setLoading(false);
        console.log("Data fetched successfully", res.data.task);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("Can't fetch data");
      });
  }, [id]);

  const handleEditTask = () => {
    const data = {
        status: true,
    }
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, data)
      .then(() => {
        setLoading(false);
        console.log("Task marked as completed!!", data.status);
        alert("Task marked as completed!!");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Something went wrong! Try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {loading ? (
          <p className="text-gray-600 text-center font-semibold">Loading...</p>
        ) : task ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {task.title}
              </h2>
            </div>
            <div>
              <p className="text-gray-600">
                {task.description || "No Description Available"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
              {new Date(task.date).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
              </p>
            </div>
        
            <div>
              <p
                className={`font-semibold ${
                  task.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {task.status ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex justify-between">
            <button
                onClick={() => {
                  setStatus(true);
                  handleEditTask();
                }}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
              >
                Mark as completed
              </button>
              <button
                onClick={() => navigate(`/task/delete/${task._id}`)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-600 text-center font-semibold">
            Can't load task details
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewTask;
