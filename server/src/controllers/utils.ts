import type { Request, Response } from "express";

export const Hello = (req: Request, res: Response) => {
  res.json({ message: "Hello World!!" });
};
