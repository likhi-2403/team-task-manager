import { Link } from "react-router-dom";

const Tasks = () => {
  return (
    <div style={{ padding: "20px" }}>
      
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Tasks Page</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/dashboard">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Dashboard
            </button>
          </Link>

          <Link to="/tasks">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Tasks
            </button>
          </Link>
        </div>
      </div>

      {/* Tasks Content */}
      <h2>Your Tasks</h2>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <p>No tasks yet.</p>
      </div>
    </div>
  );
};

export default Tasks;