import { Router } from "express";
import validation from "../middlewares/validation";
import { registerSchema, loginSchema } from "../validations/auth-schema";
import {
  handleRegistration,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "../controllers";

const router = Router();

router.post("/register", validation(registerSchema), handleRegistration);
router.post("/login", validation(loginSchema), handleLogin);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);

export default router;
