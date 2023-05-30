import { Response, Request } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.send(401).json({ message: "No cookies set" });

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken });
  if (!user)
    res.send(403).json({ message: "User with refresh token not found" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err || user?.id !== decoded._id) res.sendStatus(403);

      const newAccessToken = jwt.sign(
        { userId: decoded?._id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1m" }
      );

      res.json({ newAccessToken });
    }
  );
};

export default handleRefreshToken;
