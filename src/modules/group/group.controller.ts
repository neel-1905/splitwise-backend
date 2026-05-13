import { Request, Response } from "express";
import * as groupService from "./group.service";
import { addMemberSchema, createGroupSchema } from "./group.schema";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const validatedGroup = createGroupSchema.parse(req.body);

    const group = await groupService.createGroup(
      validatedGroup.name,
      req.user.userId,
    );

    res.status(201).json({
      message: "Group created",
      group,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getUserGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getUserGroups(req.user.userId);

    res.status(200).json({
      groups,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).json({
      groups,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getGroup = async (req: Request, res: Response) => {
  try {
    const group = await groupService.getGroup(
      req.params.id as string,
      req.user.userId,
    );

    res.status(200).json({
      message: "Group found",
      group,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const validatedData = addMemberSchema.parse(req.body);

    const member = await groupService.addGroupMember(
      req.params.groupId as string,
      req.user.userId,
      validatedData.userId,
    );

    res.status(201).json({
      message: "Member added to group",
      member,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    await groupService.removeMember(
      req.params.groupId as string,
      req.user.userId,
      req.params.userId as string,
    );

    res.status(200).json({
      message: "Member removed",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    await groupService.deleteGroup(
      req.params.groupId as string,
      req.user.userId,
    );

    res.status(200).json({
      message: "Group deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
