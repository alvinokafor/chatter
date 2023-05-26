import type { Request, Response } from "express";
import { User } from "../models";

export const Register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  await User.findOne({ email });
  res.json({ firstName, lastName, email, password });
};
