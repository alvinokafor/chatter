import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import logger from "../config/logger";
import { createHash, compareHash } from "../utils/hash";

export const handleRegistration = async (req: Request, res: Response) => {
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

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    logger.error(`Email does not exist`);
    res.status(401).json({ message: `Username or password incorrect` });
  }

  const isPasswordMatch = await compareHash(password, user!.password);

  if (isPasswordMatch) {
    const accessToken = jwt.sign(
      { userId: user?.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
      { userId: user?.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    user!.refreshToken = refreshToken;
    const response = await user!.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    let userObj;
    userObj = response.toJSON();
    Reflect.deleteProperty(userObj, "password");
    Reflect.deleteProperty(userObj, "updatedAt");
    Reflect.deleteProperty(userObj, "__v");

    res.json({ userData: userObj, accessToken });
  } else {
    res.status(401).json({ message: `Username or password incorrect` });
  }
};
