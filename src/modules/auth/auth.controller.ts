import { Request, Response } from "express";
import { loginSchema, signupSchema } from "./auth.schema";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const validateData = signupSchema.parse(req.body);

    const user = await authService.signup(validateData);

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validateData = loginSchema.parse(req.body);

    const result = await authService.login(validateData);

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
