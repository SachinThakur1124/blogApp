import { Router } from "express";
import {
  userRegisterController,
  userLoginController,
  verifyTokenController,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/verifyToken", verifyTokenController);

export default router;
