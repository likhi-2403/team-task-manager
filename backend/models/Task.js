import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      assignedTo: {
        type: String,
      },

      dueDate: {
        type: Date,
      },

      priority: {
        type: String,
        default: "Medium",
      },

      status: {
        type: String,
        default: "Pending",
      },

      // PROJECT CONNECTION
      projectId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Project",
      },
    },
    {
      timestamps: true,
    }
  );

const Task =
  mongoose.model(
    "Task",
    taskSchema
  );

export default Task;