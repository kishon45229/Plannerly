import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import DeleteTask from './pages/DeleteTask'
import ViewTask from './pages/ViewTask'
import EditTask from './pages/EditTask'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/add" element={<AddTask />} />
      <Route path="/task/delete/:id" element={<DeleteTask />} />
      <Route path="/task/view/:id" element={<ViewTask />} />
      <Route path="/task/edit/:id" element={<EditTask />} />
    </Routes>
  )
}

export default App
