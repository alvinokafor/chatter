import { Response, Request } from "express";
import { User } from "../models";

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204);
  const refreshToken = cookies?.jwt;

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: false });
    res
      .send(204)
      .json({ message: "No user with corresponding refresh token found" });
  }

  user!.refreshToken = "";
  const response = await user!.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: false });
  res.sendStatus(204);
};

export default handleLogout;
