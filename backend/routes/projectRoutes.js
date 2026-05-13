import express from "express";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router =
  express.Router();

// CREATE PROJECT
router.post(
  "/",
  createProject
);

// GET PROJECTS
router.get(
  "/",
  getProjects
);

// UPDATE PROJECT
router.put(
  "/edit/:id",
  updateProject
);

// DELETE PROJECT
router.delete(
  "/:id",
  deleteProject
);

export default router;