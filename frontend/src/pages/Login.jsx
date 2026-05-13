import {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Login = () => {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const loginHandler =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            "http://localhost:5000/api/users/login",
            {
              email,
              password,
            }
          );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // SAVE USER
        localStorage.setItem(
          "userInfo",
          JSON.stringify(
            res.data
          )
        );

        alert(
          "Login Successful"
        );

        // REDIRECT
        navigate(
          "/dashboard"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={
          loginHandler
        }
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Login
        </h1>

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

        {/* BUTTON */}
        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an
          account?
          {" "}
          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;