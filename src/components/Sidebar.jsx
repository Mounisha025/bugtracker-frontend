import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-64 bg-gray-800 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-6">
        Menu
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/users">
            Users
          </Link>
        </li>

        <Link
    to="/projects"
    className="block hover:text-blue-400"
  >
    Projects
  </Link>


        <li>
          <Link to="/bugs">
            Bugs
          </Link>
        </li>

      </ul>

      <li>

  
</li>

    </div>
  );
}

export default Sidebar;