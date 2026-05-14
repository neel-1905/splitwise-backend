import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as expenseController from "./expense.controller";

const router = Router();

router.post("/", authMiddleware, expenseController.createExpense);
router.get("/:groupId/all", authMiddleware, expenseController.getGroupExpenses);

export default router;
