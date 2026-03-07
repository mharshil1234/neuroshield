import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTask, updateStep, getUserTasks } from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.post("/step", authMiddleware, updateStep);
router.get("/", authMiddleware, getUserTasks);

export default router;