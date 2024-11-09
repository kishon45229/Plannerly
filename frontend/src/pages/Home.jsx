import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_SERVER_PORT || 5000;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/api/tasks`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
        console.log("Tasks fetched in the homepage");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Can't fetch tasks!!!");
      });
  }, []);

  return (
    <div className="min-h-screen bg-sky-100 p-8">
      <h3 className="text-2xl font-bold text-black mb-2">Plan your day with</h3>
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold text-sky-700 mb-4">Plannerly</h1>
        <Link to={`/task/add`}>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Your All Tasks
      </h2>

      {loading ? (
        <div className="text-sky-700 font-semibold text-center">Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No tasks available!</p>
          <Link
            to={`/task/add`}
            className="px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-800 transition"
          >
            Create a new task
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="text-xl font-bold text-sky-700 mb-2">
                  {task.title}
                </h3>
                <p className="text-gray-700 mb-4">{task.description}</p>
                <p className="text-gray-500 mb-4">
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
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    task.status
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {task.status ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <Link
                  to={`/task/view/${task._id}`}
                  className="text-sky-700 hover:underline"
                >
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link
                  to={`/task/edit/${task._id}`}
                  className="text-sky-700 hover:underline"
                >
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link
                  to={`/task/delete/${task._id}`}
                  className="text-sky-700 hover:underline"
                >
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </div>
          ))}

          <div
            onClick={() => navigate("/task/add")}
            className="bg-sky-100 border-2 border-dashed border-sky-700 shadow-md rounded-lg p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-sky-200 transition"
          >
            <MdOutlineAddBox className="text-sky-700 text-5xl mb-2" />
            <span className="text-sky-700 font-semibold text-lg">Create new task</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;