import { Router } from "express";
import { createBlogController } from "../controllers/blog.controllers.js";
import verifyToken from "../middlewares/verifyToken.middlewares.js";
import upload from "../config/multer.config.js";
const router = Router();

router
  .route("/")
  .post(verifyToken, upload.single("image"), createBlogController);

export default router;
