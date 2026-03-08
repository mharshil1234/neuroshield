import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { updateQuestions, redeemExp } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.post("/questions", authMiddleware, updateQuestions);
router.post("/redeem", authMiddleware, redeemExp);

export default router;