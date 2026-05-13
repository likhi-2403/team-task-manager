import Task from "../models/Task.js";

// CREATE TASK
export const createTask =
  async (req, res) => {
    try {
      const {
        title,
        description,
        assignedTo,
        dueDate,
        priority,
        projectId,
      } = req.body;

      const newTask =
        new Task({
          title,
          description,
          assignedTo,
          dueDate,
          priority,
          projectId,
          status:
            "Pending",
        });

      await newTask.save();

      res.status(201).json(
        newTask
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET TASKS
export const getTasks =
  async (req, res) => {
    try {
      const tasks =
        await Task.find();

      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// UPDATE TASK STATUS
export const updateTaskStatus =
  async (req, res) => {
    try {
      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedTask
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// EDIT TASK
export const updateTask =
  async (req, res) => {
    try {
      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedTask
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// DELETE TASK
export const deleteTask =
  async (req, res) => {
    try {
      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Task Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };