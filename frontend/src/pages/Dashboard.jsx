import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

const Dashboard = () => {
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

  const [editingProjectId,
  setEditingProjectId] =
    useState(null);

  // USER INFO
  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  // FETCH TASKS
  const fetchTasks =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/tasks"
          );

        setTasks(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  // FETCH PROJECTS
  const fetchProjects =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/projects"
          );

        setProjects(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  // CREATE PROJECT
  const createProject =
    async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/projects",
          {
            title,
            description,
          }
        );

        setTitle("");

        setDescription("");

        fetchProjects();

        alert(
          "Project Created"
        );
      } catch (error) {
        console.log(error);
      }
    };

  // EDIT PROJECT
  const editProject =
    async (id) => {
      try {
        await axios.put(
          `http://localhost:5000/api/projects/edit/${id}`,
          {
            title,
            description,
          }
        );

        setTitle("");

        setDescription("");

        setEditingProjectId(
          null
        );

        fetchProjects();

        alert(
          "Project Updated"
        );
      } catch (error) {
        console.log(error);
      }
    };

  // DELETE PROJECT
  const deleteProject =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/projects/${id}`
        );

        fetchProjects();

        alert(
          "Project Deleted"
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();

    fetchProjects();
  }, []);

  // ANALYTICS
  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  const highPriorityTasks =
    tasks.filter(
      (task) =>
        task.priority ===
        "High"
    ).length;

  // CHART DATA
  const chartData = [
    {
      name: "Completed",
      value:
        completedTasks,
    },

    {
      name: "Pending",
      value:
        pendingTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
  ];

  return (
    <div>
      {/* NAVBAR */}
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">
        {/* TITLE */}
        <h1 className="text-6xl font-bold mb-10">
          Dashboard
        </h1>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-500 text-white p-6 rounded">
            <h2 className="text-3xl font-bold">
              Total Tasks
            </h2>

            <p className="text-6xl mt-4">
              {
                tasks.length
              }
            </p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded">
            <h2 className="text-3xl font-bold">
              Completed
            </h2>

            <p className="text-6xl mt-4">
              {
                completedTasks
              }
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded">
            <h2 className="text-3xl font-bold">
              Pending
            </h2>

            <p className="text-6xl mt-4">
              {
                pendingTasks
              }
            </p>
          </div>

          <div className="bg-red-500 text-white p-6 rounded">
            <h2 className="text-3xl font-bold">
              High Priority
            </h2>

            <p className="text-6xl mt-4">
              {
                highPriorityTasks
              }
            </p>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white p-8 rounded shadow mb-10">
          <h2 className="text-4xl font-bold mb-6">
            Task Analytics
          </h2>

          <PieChart
            width={500}
            height={400}
          >
            <Pie
              data={
                chartData
              }
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={
                120
              }
              label
            >
              {chartData.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </div>

        {/* ADMIN ONLY */}
        {userInfo?.role ===
          "Admin" && (
          <div className="bg-white p-8 rounded shadow mb-10">
            <h2 className="text-4xl font-bold mb-6">
              {editingProjectId
                ? "Edit Project"
                : "Create Project"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  editingProjectId
                ) {
                  editProject(
                    editingProjectId
                  );
                } else {
                  createProject();
                }
              }}
            >
              {/* TITLE */}
              <input
                type="text"
                placeholder="Project Title"
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

              {/* BUTTON */}
              <button className="bg-blue-600 text-white px-6 py-3 rounded">
                {editingProjectId
                  ? "Update Project"
                  : "Create Project"}
              </button>
            </form>
          </div>
        )}

        {/* PROJECTS */}
        <h2 className="text-5xl font-bold mb-8">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(
            (
              project
            ) => (
              <div
                key={
                  project._id
                }
                className="bg-white p-6 rounded shadow"
              >
                <h3 className="text-4xl font-bold mb-4">
                  {
                    project.title
                  }
                </h3>

                <p className="text-2xl mb-4">
                  {
                    project.description
                  }
                </p>

                {/* BUTTONS */}
                {userInfo?.role ===
                  "Admin" && (
                  <div className="flex gap-4">
                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setEditingProjectId(
                          project._id
                        );

                        setTitle(
                          project.title
                        );

                        setDescription(
                          project.description
                        );
                      }}
                      className="bg-yellow-500 text-white px-5 py-2 rounded"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteProject(
                          project._id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;