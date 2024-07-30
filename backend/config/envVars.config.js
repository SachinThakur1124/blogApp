import dotenv from "dotenv";

dotenv.config({
  path: "./backend/.env",
});

export const { PORT, MONGO_URI, JWT_SECRET, CORS_ORIGIN } = process.env;
