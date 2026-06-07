import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

function UsersPage() {

  const [users, setUsers] =
    useState([]);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const response =
        await API.get("/users");

      setUsers(response.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to fetch users"
      );
    }
  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Users
      </h1>

      {
        error && (

          <p className="text-red-500">
            {error}
          </p>
        )
      }

      <div className="space-y-4">

        {
          users.map((user) => (

            <div
              key={user.id}
              className="border p-4 rounded-lg shadow"
            >

              <h2 className="text-xl font-bold">
                {user.name}
              </h2>

              <p>{user.email}</p>

              <p>{user.role}</p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default UsersPage;