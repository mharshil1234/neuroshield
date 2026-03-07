import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const taskSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  taskName: {
    type: String,
    required: true
  },

  steps: [stepSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Task = mongoose.model("Task", taskSchema);

export default Task;