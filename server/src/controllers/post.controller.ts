import { Response, Request } from "express";
import { Post } from "../models/Post";
import logger from "../config/logger";

export const handleCreatePost = async (req: Request, res: Response) => {
  const { title, body } = req.body;

  try {
    const response = await Post.create({
      userId: req.body.id,
      title: title,
      body: body,
    });

    res.status(201).json({ response });
  } catch (err) {
    logger.error(`Error: ${err}`);
    res.sendStatus(500);
  }
};

export const handleGetUserPosts = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) return res.sendStatus(401);

  try {
    const userPosts = await Post.find({ userId: userId });
    res.status(200).json(userPosts);
  } catch (err) {
    logger.error(`Error: ${err}`);
    res.sendStatus(500);
  }
};

export const handleGetPost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) return res.sendStatus(404);

  try {
    const post = await Post.findOne({ _id: postId });
    res.status(200).json(post);
  } catch (err) {
    logger.error(`Error: ${err}`);
    res.sendStatus(500);
  }
};

export const handleUpdatePost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const postId = req.params.id;
  if (!postId) return res.sendStatus(404);

  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) res.sendStatus(404);

    if (title) post!.title = title;
    if (body) post!.body = body;

    const updatedPost = await post?.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    logger.error(`Error: ${err}`);
    res.sendStatus(500);
  }
};

export const handleDeletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) return res.sendStatus(404);

  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) res.sendStatus(404);

    const response = await Post.deleteOne({ _id: postId });
    res.status(200).json(response);
  } catch (err) {
    logger.error(`Error: ${err}`);
    res.sendStatus(500);
  }
};

export const handleGetALlPosts = async (req: Request, res: Response) => {
  const allPosts = await Post.find();
  if (!allPosts) res.sendStatus(404);

  res.status(200).json(allPosts);
};
