import { Request, Response } from "express";
import * as userService from "./user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      users,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
