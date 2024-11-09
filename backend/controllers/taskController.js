const Task = require('../models/task');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Get a single task
exports.getTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({message: "Task not found!!"});
        res.status(200).json({task});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(200).json(newTask);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if(!task) return res.status(404).json({message: "Task not found!"});
        const updateTask = await Task.findById(id);
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) return res.status(404).json({message: "Task not found!!"});
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};