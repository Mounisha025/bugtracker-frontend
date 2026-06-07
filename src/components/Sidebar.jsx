import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

function Sidebar() {

  const token =
    localStorage.getItem("token");

  let role = "";

  if (token) {

    const decoded =
      jwtDecode(token);

    role = decoded.role;
  }

  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 hidden md:block">

      <h2 className="text-3xl font-bold mb-10">

        Menu

      </h2>

      <ul className="space-y-5">

        {/* Dashboard */}

        <li>

          <Link
            to="/dashboard"
            className="hover:text-blue-400 text-lg"
          >
            Dashboard
          </Link>

        </li>

        {/* Admin */}

        {
          role === "ADMIN" && (

            <li>

              <Link
                to="/users"
                className="hover:text-blue-400 text-lg"
              >
                Users
              </Link>

            </li>
          )
        }

        {/* Admin + Developer */}

        {
          (role === "ADMIN" ||
            role === "DEVELOPER") && (

            <li>

              <Link
                to="/projects"
                className="hover:text-blue-400 text-lg"
              >
                Projects
              </Link>

            </li>
          )
        }

        {/* All */}

        <li>

          <Link
            to="/bugs"
            className="hover:text-blue-400 text-lg"
          >
            Bugs
          </Link>

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;