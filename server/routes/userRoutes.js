import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { updateQuestions } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.post("/questions", authMiddleware, updateQuestions);

export default router;