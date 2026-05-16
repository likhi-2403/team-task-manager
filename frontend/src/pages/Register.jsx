import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", data.token);

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;