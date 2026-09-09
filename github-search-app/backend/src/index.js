import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "node:url";
import repoRoutes from "./routes/repoRoutes.js";

dotenv.config({
  path: fileURLToPath(new URL("../../.env", import.meta.url)),
});

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/repos", repoRoutes);

// Keep API errors in one consistent JSON format for the frontend.
app.use((error, _request, response, _next) => {
  const statusCode = error.statusCode || 500;
  response.status(statusCode).json({
    message: error.message || "Unexpected server error.",
  });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
