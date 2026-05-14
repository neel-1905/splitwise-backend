import { Request, Response } from "express";
import * as expenseService from "./expense.service";
import { createExpenseSchema } from "./expense.schema";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const validatedData = createExpenseSchema.parse(req.body);

    const expense = await expenseService.createExpense(
      validatedData,
      req.user.userId,
    );

    res.status(201).json({
      message: "Expense created",
      expense,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getGroupExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await expenseService.getGroupExpenses(
      req.params.groupId as string,
      req.user.userId,
    );

    res.status(200).json({
      expenses,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
