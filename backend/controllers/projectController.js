import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject =
  async (req, res) => {
    try {
      const {
        title,
        description,
      } = req.body;

      const newProject =
        new Project({
          title,
          description,
        });

      await newProject.save();

      res.status(201).json(
        newProject
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET PROJECTS
export const getProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find();

      res.json(projects);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// UPDATE PROJECT
export const updateProject =
  async (req, res) => {
    try {
      const updatedProject =
        await Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedProject
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// DELETE PROJECT
export const deleteProject =
  async (req, res) => {
    try {
      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Project Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };