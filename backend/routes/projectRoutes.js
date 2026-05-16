import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.delete("/:id", protect, deleteProject);

export default router;