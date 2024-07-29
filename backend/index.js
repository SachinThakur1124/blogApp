import express, { application } from "express";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import { PORT } from "./config/envVars.config.js";
import connectDB from "./config/db.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`server is listening http://localhost:${PORT}`);
  connectDB();
});
