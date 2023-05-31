import { Router } from "express";
import ping from "./ping";
import authRoutes from "./auth";
import postRoutes from "./posts";

const router = Router();

router.use("/ping", ping);

//Auth routes
router.use("/auth", authRoutes);
//Post routes
router.use("/posts", postRoutes);

export default router;
