const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    content: { type: String,  required: true }
});

let Todo=mongoose.model('Todo',todoSchema);

 module.exports = {
    Todo
};