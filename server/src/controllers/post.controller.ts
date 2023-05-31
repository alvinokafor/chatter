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
