import type { Request, Response } from "express";
import { User } from "../models";
import { ApiError } from "../libs/errors";
import { IUser } from "../interfaces";
import logger from "../config/logger";
import { createHash, compareHash } from "../utils/hash";

export const Register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    // throw new ApiError(409, "Email already exists");
    logger.error(`Email: ${user.email} already exists`);
    res.status(409).json({ message: `Email: ${user.email} already exists` });
  }

  const hashedPassword = await createHash(password);

  user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  const userObj = user.toJSON();
  Reflect.deleteProperty(userObj, "password");
  Reflect.deleteProperty(userObj, "updatedAt");
  Reflect.deleteProperty(userObj, "__v");

  res.status(201).json({ data: userObj, message: "User created sucessfully!" });
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    logger.error(`Email does not exist`);
    res.status(401).json({ message: `Email does not exist` });
  }

  const isPasswordMatch = await compareHash(password, user!.password);
  let userObj;
  if (isPasswordMatch) {
    userObj = user!.toJSON();
    Reflect.deleteProperty(userObj, "password");
    Reflect.deleteProperty(userObj, "updatedAt");
    Reflect.deleteProperty(userObj, "__v");

    res.status(201).json({ data: userObj, message: "User login sucessfull!" });
  }
};
