const mongoose = require('./db');

const taskSchema = new mongoose.Schema({
  Deadlines: String,
  Priority: String,
  userEmail: String,
  status: String,
  TaskDescription: String,
  TaskTitle: String,
})

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task }
