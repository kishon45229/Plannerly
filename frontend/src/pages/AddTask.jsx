import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDateTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_SERVER_PORT || 5000;

  const now = new Date();
  const handleDateChange = (selectedDate) => {
    setDateTime(selectedDate);
  };
  const getMinTime = () => {
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      const minTime = new Date(now);
      minTime.setMinutes(now.getMinutes() + 1);
      return minTime;
    } else {
      return new Date().setHours(0, 0, 0, 0);
    }
  };

  const handleSaveTask = () => {
    const data = {
      title,
      description,
      date,
    };
    setLoading(true);
    axios
      .post(`http://localhost:${PORT}/api/tasks`, data)
      .then(() => {
        setLoading(false);
        alert("Task created successfully!!");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("Error creating task");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-sky-100 py-8 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <h1 className="text-3xl font-bold text-sky-700 mb-8">Add New Task</h1>
      {loading && (
        <div className="text-sky-700 font-semibold mb-4">Loading...</div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select a day
          </label>
          <DatePicker
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
            selected={date}
            onChange={handleDateChange}
            minDate={new Date()}
            minTime={getMinTime()}
            maxTime={new Date().setHours(23, 59, 59, 999)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMM d, yyyy h:mm aa"
          />
        </div>

        <button
          onClick={handleSaveTask}
          className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-800 transition"
        >
          Create task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
