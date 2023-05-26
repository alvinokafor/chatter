import { Router } from "express";
import validation from "../middlewares/validation";
import { registerSchema } from "../validations/auth-schema";
import { authController } from "../controllers";

const router = Router();

router.post("/register", validation(registerSchema), authController.Register);

export default router;
