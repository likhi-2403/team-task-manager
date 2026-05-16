import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dashboard Stats

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) < new Date() &&
      task.status !== "Done"
  ).length;

  return (
    <div>
      {/* Navbar */}

      <nav
        style={{
          backgroundColor: "#2563eb",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "white" }}>Team Task Manager</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link
            to="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "#1d4ed8",
              padding: "10px 18px",
              borderRadius: "5px",
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            style={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "green",
              padding: "10px 18px",
              borderRadius: "5px",
            }}
          >
            Tasks
          </Link>

          <Link
            to="/projects"
            style={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "#9333ea",
              padding: "10px 18px",
              borderRadius: "5px",
            }}
          >
            Projects
          </Link>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}

      <div style={{ padding: "30px" }}>
        <h1>Dashboard</h1>

        <p style={{ marginTop: "10px", marginBottom: "30px" }}>
          Welcome to Team Task Manager
        </p>

        {/* Stats Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <h3>Total Tasks</h3>
            <h1>{totalTasks}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <h3>Completed</h3>
            <h1>{completedTasks}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#eab308",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <h3>Pending</h3>
            <h1>{pendingTasks}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <h3>Overdue</h3>
            <h1>{overdueTasks}</h1>
          </div>
        </div>

        {/* Recent Tasks */}

        <div style={{ marginTop: "50px" }}>
          <h2>Recent Tasks</h2>

          {tasks.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "10px",
              }}
            >
              No tasks available.
            </div>
          ) : (
            tasks.slice(0, 5).map((task) => (
              <div
                key={task._id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{task.title}</h3>

                <p>
                  <strong>Status:</strong> {task.status}
                </p>

                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>

                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;