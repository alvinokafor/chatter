import { Router } from "express";
import utilRoutes from "./utils";
import authRoutes from "./auth";

const router = Router();

router.use("/utils", utilRoutes);
router.use("/auth", authRoutes);

export default router;
