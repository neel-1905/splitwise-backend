import { Router } from "express";

import * as groupController from "./group.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, groupController.createGroup);
router.get("/", authMiddleware, groupController.getUserGroups);
router.get("/all", groupController.getAllGroups);
router.get("/:id", authMiddleware, groupController.getGroup);
router.delete("/:groupId", authMiddleware, groupController.deleteGroup);
router.post("/:groupId/members", authMiddleware, groupController.addMember);
router.delete(
  "/:groupId/members/:userId",
  authMiddleware,
  groupController.removeMember,
);

export default router;
