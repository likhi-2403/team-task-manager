import { useEffect, useState } from "react";
import API from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

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

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", formData);

      alert("Task Added");

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      alert("Task Deleted");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "20px",
        }}
      >
        Tasks
      </h1>

      <form
        onSubmit={submitHandler}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={changeHandler}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={changeHandler}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={changeHandler}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={changeHandler}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </form>

      <div>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;