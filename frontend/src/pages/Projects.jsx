import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetchProjects();
  }, []);

  // Fetch Projects

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Create Project

  const handleCreateProject = async () => {
    if (!projectName || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/projects", {
        projectName,
        description,
      });

      setProjectName("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Project

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  // Logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

      {/* Main Content */}

      <div style={{ padding: "30px" }}>
        <h1>Projects Page</h1>

        {/* Create Project */}

        <div
          style={{
            marginTop: "30px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "450px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Create Project</h3>

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          ></textarea>

          <button
            onClick={handleCreateProject}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create Project
          </button>
        </div>

        {/* Projects List */}

        <div style={{ marginTop: "50px" }}>
          <h2>Your Projects</h2>

          {projects.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "10px",
              }}
            >
              No projects yet.
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{project.projectName}</h3>

                <p style={{ marginTop: "10px" }}>
                  {project.description}
                </p>

                <button
                  onClick={() => deleteProject(project._id)}
                  style={{
                    marginTop: "15px",
                    padding: "10px 15px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete Project
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;