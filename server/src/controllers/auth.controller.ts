import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models";
import logger from "../config/logger";
import { createHash, compareHash } from "../utils/hash";

//registration controller
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

//login controller
export const handleLogin = async (req: Request, res: Response) => {
  const cookies = req.cookies;
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

    if (cookies?.jwt) {
      const unauthorisedUser = await User.findOne({
        refreshToken: cookies?.jwt,
      });
      unauthorisedUser!.refreshToken = "";
      await unauthorisedUser?.save();

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: false,
      });
    }

    user!.refreshToken = refreshToken;
    const response = await user!.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
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

//forgot password controller
export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) res.status(401).json({ message: "User does not exist" });

  const resetToken = jwt.sign(
    { userId: user?.id },
    process.env.EMAIL_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );

  const resetLink = `http://localhost:3500/reset-password/${resetToken}`;

  const config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);
  const message = {
    from: process.env.EMAIL_ACCOUNT,
    to: email,
    subject: "Reset Password",
    html: `<p>Go to <a href=${resetLink}>${resetLink}</a> to reset your password`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      res.status(200).json({
        message: `Reset link: ${resetLink} has been sent to your mail`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

//reset password controller
export const handleResetPassword = async (
  req: Request<{ resetToken: string }>,
  res: Response
) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  try {
    jwt.verify(
      resetToken,
      process.env.EMAIL_TOKEN_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) res.sendStatus(403);
        console.log(decoded);

        const user = await User.findOne({ _id: decoded.userId });
        if (!user) res.status(403).json({ message: "User not found" });

        const hashedPassword = await createHash(newPassword);
        user!.password = hashedPassword;

        const updatedUser = await user?.save();

        res.status(200).json(updatedUser);
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
