import { Response, Request } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.send(401).json({ message: "No cookies set" });
  const refreshToken = cookies.jwt;
  //clear the refresh token cookie from the browser
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: false });

  const user = await User.findOne({ refreshToken });
  /*if the user isn't found, reverify & invalidate the 
    refresh token by resetting it in the db */
  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) res.sendStatus(403);
        const unauthorisedUser = await User.findOne({ id: decoded.userId });
        unauthorisedUser!.refreshToken = "";
        const response = await unauthorisedUser?.save();
        console.log(response);
      }
    );

    res.send(403).json({ message: "User with refresh token not found" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      //if refresh token is expired, reset it
      if (err) {
        user!.refreshToken = "";
        const response = await user?.save();
        console.log(response);
      }
      if (err || user?.id !== decoded.userId) res.sendStatus(403);

      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1m" }
      );

      //create a new refresh token
      const newRefreshToken = jwt.sign(
        { userId: decoded.userId },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      //save the new refresh token to the db
      user!.refreshToken = newRefreshToken;
      const response = await user?.save();
      console.log(response);

      //send back a new cookie for the new refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ newAccessToken, newRefreshToken });
    }
  );
};

export default handleRefreshToken;
