import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const PORT = import.meta.env.VITE_SERVER_PORT || 5000;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:${PORT}/api/tasks/${id}`)
      .then((res) => {
        setTitle(res.data.task.title);
        setDescription(res.data.task.description);
        setDate(new Date(res.data.task.date));
        setStatus(res.data.task.status);
        setLoading(false);
        console.log("Task data fetched!!");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Unable to fetch task data.");
      });
  }, [id]);

  const handleEditTask = () => {
    const data = {
      title,
      description,
      date,
      status
    };
    setLoading(true);
    axios
      .put(`http://localhost:${PORT}/api/tasks/${id}`, data)
      .then(() => {
        setLoading(false);
        console.log("Task updated!!");
        alert("Task updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Something went wrong! Try again.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 py-8 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-sky-700 mb-6">Edit Task</h1>

        {loading ? (
          <p className="text-sky-700 font-semibold">Loading...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Task name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Date and Time
              </label>
              <DatePicker
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                selected={date}
                onChange={(selectedDate) => setDate(selectedDate)}
                minDate={new Date()}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMM d, yyyy h:mm aa"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value === "true")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
              >
                <option value="false">Pending</option>
                <option value="true">Completed</option>
              </select>
            </div>

            <div className="mt-6">
              <button
                onClick={handleEditTask}
                className="w-full bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTask;