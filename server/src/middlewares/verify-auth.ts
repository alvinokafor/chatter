import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) res.sendStatus(401);

  const token: string | undefined = authHeader?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) res.sendStatus(403);
      req.body.id = decoded.userId;
      next();
    }
  );
};
