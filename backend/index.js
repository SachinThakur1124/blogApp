import express from "express";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import { CORS_ORIGIN, PORT } from "./config/envVars.config.js";
import connectDB from "./config/db.config.js";
import path from "path";
import cors from "cors";
import serveStatic from "serve-static";

const app = express();
const __dirname = path.resolve();

console.log(CORS_ORIGIN);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/images", express.static(path.join(__dirname, "/uploads")));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
});
