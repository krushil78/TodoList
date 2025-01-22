const mongoose = require("mongoose");
// task schemas using mongoose 

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
