import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Default Route

app.get("/", (req, res) => {
  res.send("API Running");
});

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/projects", projectRoutes);

// Port

const PORT = process.env.PORT || 5000;

// Start Server

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});