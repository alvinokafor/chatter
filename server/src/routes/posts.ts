import { Router } from "express";
import { handleCreatePost } from "../controllers";
import { verifyAuth } from "../middlewares/verify-auth";

const router = Router();

router.post("/create-post", verifyAuth, handleCreatePost);

export default router;
