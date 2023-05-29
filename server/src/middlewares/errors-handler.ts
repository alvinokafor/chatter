import { ApiError } from "../libs/errors";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    res.status(error.code).json({ message: error.message });
  } else {
    logger.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
