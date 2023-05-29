import { Router } from "express";
import ping from "./ping";
import authRoutes from "./auth";

const router = Router();

router.use("/ping", ping);
//Auth routes
router.use("/auth", authRoutes);

export default router;
