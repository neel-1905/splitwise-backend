import { Router } from "express";
import authRoutes from "../../modules/auth/auth.routes";
import groupRoutes from "../../modules/group/group.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/group", groupRoutes);

export default router;
