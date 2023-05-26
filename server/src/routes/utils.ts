import { Router } from "express";
import { utilsControllers } from "../controllers";

const router = Router();

router.get("/", utilsControllers.Hello);

export default router;
