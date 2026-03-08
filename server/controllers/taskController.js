import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {

  try {

    const { taskName, steps } = req.body;

    const formattedSteps = steps.map(step => ({
      content: step,
      completed: false
    }));

    const task = new Task({
      userId: req.user.id,
      taskName,
      steps: formattedSteps
    });

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};

export const updateStep = async (req, res) => {

  try {

    const { taskId, stepIndex } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.steps[stepIndex].completed = true;

    await task.save();

    // increase EXP by 50
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { exp: 50 } }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};

export const getUserTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      userId: req.user.id
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};