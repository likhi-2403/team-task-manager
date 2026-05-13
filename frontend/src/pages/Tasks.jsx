import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

const Tasks = () => {
  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    assignedTo,
    setAssignedTo,
  ] = useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [projectId, setProjectId] =
    useState("");

  const [editingTaskId,
  setEditingTaskId] =
    useState(null);

  // FETCH TASKS
  const fetchTasks =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/tasks",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTasks(
          res.data
        );
      } catch (error) {
        toast.error(
          "Failed to fetch tasks"
        );
      }
    };

  // FETCH PROJECTS
  const fetchProjects =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/projects",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setProjects(
          res.data
        );
      } catch (error) {
        toast.error(
          "Failed to fetch projects"
        );
      }
    };

  // CREATE TASK
  const createTask =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "http://localhost:5000/api/tasks",
          {
            title,
            description,
            assignedTo,
            dueDate,
            priority,
            projectId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        resetForm();

        fetchTasks();

        toast.success(
          "Task Created Successfully"
        );
      } catch (error) {
        toast.error(
          "Task Creation Failed"
        );
      }
    };

  // EDIT TASK
  const editTask =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/tasks/edit/${id}`,
          {
            title,
            description,
            assignedTo,
            dueDate,
            priority,
            projectId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        resetForm();

        fetchTasks();

        toast.success(
          "Task Updated"
        );
      } catch (error) {
        toast.error(
          "Update Failed"
        );
      }
    };

  // COMPLETE TASK
  const completeTask =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/tasks/${id}`,
          {
            status:
              "Completed",
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchTasks();

        toast.success(
          "Task Completed"
        );
      } catch (error) {
        toast.error(
          "Failed to update task"
        );
      }
    };

  // DELETE TASK
  const deleteTask =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `http://localhost:5000/api/tasks/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchTasks();

        toast.success(
          "Task Deleted"
        );
      } catch (error) {
        toast.error(
          "Failed to delete task"
        );
      }
    };

  // RESET FORM
  const resetForm = () => {
    setTitle("");

    setDescription("");

    setAssignedTo("");

    setDueDate("");

    setPriority(
      "Medium"
    );

    setProjectId("");

    setEditingTaskId(
      null
    );
  };

  useEffect(() => {
    fetchTasks();

    fetchProjects();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-6xl font-bold mb-10">
          Tasks
        </h1>

        {/* FORM */}
        <div className="bg-white p-8 rounded shadow mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (
                editingTaskId
              ) {
                editTask(
                  editingTaskId
                );
              } else {
                createTask();
              }
            }}
          >
            {/* TITLE */}
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded mb-4"
              required
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded mb-4"
              rows="4"
              required
            />

            {/* ASSIGNED */}
            <input
              type="text"
              placeholder="Assigned To"
              value={
                assignedTo
              }
              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded mb-4"
              required
            />

            {/* DATE */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded mb-4"
              required
            />

            {/* PRIORITY */}
            <select
              value={
                priority
              }
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded mb-4"
            >
              <option value="Low">
                Low Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="High">
                High Priority
              </option>
            </select>

            {/* PROJECT */}
            <select
              value={
                projectId
              }
              onChange={(e) =>
                setProjectId(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded mb-4"
              required
            >
              <option value="">
                Select Project
              </option>

              {projects.map(
                (
                  project
                ) => (
                  <option
                    key={
                      project._id
                    }
                    value={
                      project._id
                    }
                  >
                    {
                      project.title
                    }
                  </option>
                )
              )}
            </select>

            {/* BUTTON */}
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              {editingTaskId
                ? "Update Task"
                : "Create Task"}
            </button>
          </form>
        </div>

        {/* TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(
            (task) => (
              <div
                key={
                  task._id
                }
                className="bg-white p-6 rounded shadow"
              >
                <h2 className="text-4xl font-bold mb-4">
                  {
                    task.title
                  }
                </h2>

                <p className="text-2xl mb-4">
                  {
                    task.description
                  }
                </p>

                <p className="text-xl mb-2">
                  <strong>
                    Assigned:
                  </strong>{" "}
                  {
                    task.assignedTo
                  }
                </p>

                <p className="text-xl mb-2">
                  <strong>
                    Priority:
                  </strong>{" "}
                  {
                    task.priority
                  }
                </p>

                <p className="text-xl mb-2">
                  <strong>
                    Status:
                  </strong>{" "}
                  {
                    task.status
                  }
                </p>

                <div className="flex gap-4 mt-4">
                  {/* COMPLETE */}
                  <button
                    onClick={() =>
                      completeTask(
                        task._id
                      )
                    }
                    className="bg-green-500 text-white px-5 py-2 rounded"
                  >
                    Complete
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => {
                      setEditingTaskId(
                        task._id
                      );

                      setTitle(
                        task.title
                      );

                      setDescription(
                        task.description
                      );

                      setAssignedTo(
                        task.assignedTo
                      );

                      setDueDate(
                        task.dueDate?.split(
                          "T"
                        )[0]
                      );

                      setPriority(
                        task.priority
                      );

                      setProjectId(
                        task.projectId
                      );
                    }}
                    className="bg-yellow-500 text-white px-5 py-2 rounded"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteTask(
                        task._id
                      )
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;