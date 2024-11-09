const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: false 
        },
        date: {
            type: Date, 
            required: true
        },
        status: { 
            type: Boolean, 
            default: false 
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);