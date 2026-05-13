import {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Register = () => {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [role, setRole] =
    useState("Member");

  const registerHandler =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            "http://localhost:5000/api/users/register",
            {
              name,
              email,
              password,
              role,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(
            res.data
          )
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response.data.message
        );
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={
          registerHandler
        }
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Register
        </h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full p-3 border rounded mb-4"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-3 border rounded mb-4"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-3 border rounded mb-4"
          required
        />

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full p-3 border rounded mb-4"
        >
          <option value="Member">
            Member
          </option>

          <option value="Admin">
            Admin
          </option>
        </select>

        {/* BUTTON */}
        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an
          account?
          {" "}
          <Link
            to="/"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;