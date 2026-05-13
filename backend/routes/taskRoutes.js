import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

// CREATE TASK
router.post(
  "/",
  protect,
  createTask
);

// GET TASKS
router.get(
  "/",
  protect,
  getTasks
);

// EDIT TASK
router.put(
  "/edit/:id",
  protect,
  updateTask
);

// UPDATE STATUS
router.put(
  "/:id",
  protect,
  updateTaskStatus
);

// DELETE TASK
router.delete(
  "/:id",
  protect,
  deleteTask
);

export default router;