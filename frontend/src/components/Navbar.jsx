import {
  Link,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate =
    useNavigate();

  // USER INFO
  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  // LOGOUT
  const logoutHandler =
    () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "userInfo"
      );

      navigate("/");
    };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* LOGO */}
      <h1 className="text-3xl font-bold">
        Team Task Manager
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-5">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

        {/* ROLE */}
        {userInfo && (
          <span className="bg-white text-blue-600 px-3 py-1 rounded">
            {userInfo.role}
          </span>
        )}

        {/* LOGOUT */}
        <button
          onClick={
            logoutHandler
          }
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;