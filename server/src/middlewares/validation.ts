import { ObjectSchema } from "yup";
import { Response, Request, NextFunction } from "express";

const validation =
  //@ts-ignore


    (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;

      try {
        await schema.validate(body);
        next();
      } catch (err) {
        res.status(400).json({ err });
      }
    };

export default validation;
