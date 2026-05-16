import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");

  // Fetch Tasks

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task

  const handleAddTask = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description,
        dueDate,
        priority,
        assignedTo,
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setAssignedTo("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Update Status

  const updateStatus = async (id, currentStatus) => {
    let newStatus = "Done";

    if (currentStatus === "To Do") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Done";
    }

    try {
      await API.put(`/tasks/${id}`, {
        status: newStatus,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
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
        </div>
      </nav>

      {/* Main Content */}

      <div style={{ padding: "30px" }}>
        <h1>Tasks Page</h1>

        {/* Dashboard Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "30px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "20px",
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
              padding: "20px",
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
              padding: "20px",
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
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Overdue</h3>
            <h1>{overdueTasks}</h1>
          </div>
        </div>

        {/* Create Task */}

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "500px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Create Task</h3>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          ></textarea>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="text"
            placeholder="Assigned User ID"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={handleAddTask}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}

        <div style={{ marginTop: "40px" }}>
          <h2>Your Tasks</h2>

          {tasks.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              No tasks yet.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "20px",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{task.title}</h3>

                <p>
                  <strong>Description:</strong> {task.description}
                </p>

                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>

                <p>
                  <strong>Status:</strong> {task.status}
                </p>

                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() =>
                      updateStatus(task._id, task.status)
                    }
                    style={{
                      padding: "10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Update Status
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;