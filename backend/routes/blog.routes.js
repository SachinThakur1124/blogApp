import { Router } from "express";
import {
  createBlogController,
  getAllBlogPostsControllers,
  getSingleUserBlogByUserIdController,
} from "../controllers/blog.controllers.js";
import verifyToken from "../middlewares/verifyToken.middlewares.js";
import upload from "../config/multer.config.js";
const router = Router();

router
  .route("/")
  .post(verifyToken, upload.single("image"), createBlogController)
  .get(getAllBlogPostsControllers);

router.route("/:id").get(getSingleUserBlogByUserIdController);

export default router;
