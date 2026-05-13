function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        width: "300px",
      }}
    >
      <h3>{project.name}</h3>

      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;