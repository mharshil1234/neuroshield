import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { updateQuestions, redeemExp } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { updateUser } from "../controllers/userController.js";
import { updateFocusSettings } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.post("/questions", authMiddleware, updateQuestions);
router.post("/redeem", authMiddleware, redeemExp);
router.put("/update", authMiddleware, updateUser);
router.put("/focus-settings", authMiddleware, updateFocusSettings);

export default router;