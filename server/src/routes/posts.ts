import { Router } from "express";
import {
  handleCreatePost,
  handleGetUserPosts,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
  handleGetALlPosts,
} from "../controllers";
import { verifyAuth } from "../middlewares/verify-auth";

const router = Router();

router.post("/create-post", verifyAuth, handleCreatePost);
router.get("/user-posts/:id", verifyAuth, handleGetUserPosts);
router.get("/post/:id", verifyAuth, handleGetPost);
router.patch("/update-post/:id", verifyAuth, handleUpdatePost);
router.delete("/delete-post/:id", verifyAuth, handleDeletePost);
router.get("/all-posts", handleGetALlPosts);

export default router;
