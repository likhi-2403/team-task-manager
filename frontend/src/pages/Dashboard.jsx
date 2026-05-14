import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  );

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Team Task Manager</h1>

        <div>
          <Link to="/tasks">
            <button
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Tasks
            </button>
          </Link>

          <button
            onClick={logoutHandler}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: "30px" }}>
        <h2>Dashboard</h2>

        <p
          style={{
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          Welcome, {user?.name}
        </p>

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
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>Total Tasks</h2>
            <h1>{tasks.length}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>Completed</h2>
            <h1>{completedTasks.length}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#eab308",
              color: "white",
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>Pending</h2>
            <h1>{pendingTasks.length}</h1>
          </div>

          <div
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "25px",
              borderRadius: "10px",
            }}
          >
            <h2>High Priority</h2>
            <h1>{highPriorityTasks.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;