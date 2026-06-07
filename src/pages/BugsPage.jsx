import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

function BugsPage() {

  const [bugs, setBugs] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("LOW");

  const [status, setStatus] =
    useState("OPEN");

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchBugs();

  }, []);

  const fetchBugs = async () => {

    try {

      const response =
        await API.get("/bugs");

      setBugs(response.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to fetch bugs"
      );
    }
  };

  const handleCreateBug =
    async (e) => {

      e.preventDefault();

      try {

        const newBug = {

          title,
          description,
          priority,
          status,
        };

        await API.post(
          "/bugs",
          newBug
        );

        // Clear form
        setTitle("");
        setDescription("");
        setPriority("LOW");
        setStatus("OPEN");

        // Refresh bugs
        fetchBugs();

      } catch (err) {

        console.error(err);

        setError(
          "Failed to create bug"
        );
      }
    };

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="p-10 w-full">

          <h1 className="text-4xl font-bold mb-8">
            Bugs
          </h1>

          {
            error && (

              <p className="text-red-500 mb-4">
                {error}
              </p>
            )
          }

          {/* Create Bug Form */}

          <form
            onSubmit={handleCreateBug}
            className="bg-white shadow p-6 rounded-lg mb-10"
          >

            <h2 className="text-2xl font-bold mb-4">
              Create Bug
            </h2>

            <input
              type="text"
              placeholder="Bug Title"
              className="w-full border p-3 rounded mb-4"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              placeholder="Bug Description"
              className="w-full border p-3 rounded mb-4"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            {/* Priority */}

            <select
              className="w-full border p-3 rounded mb-4"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >

              <option value="LOW">
                LOW
              </option>

              <option value="MEDIUM">
                MEDIUM
              </option>

              <option value="HIGH">
                HIGH
              </option>

            </select>

            {/* Status */}

            <select
              className="w-full border p-3 rounded mb-4"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="OPEN">
                OPEN
              </option>

              <option value="IN_PROGRESS">
                IN_PROGRESS
              </option>

              <option value="RESOLVED">
                RESOLVED
              </option>

            </select>

            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded"
            >
              Create Bug
            </button>

          </form>

          {/* Bugs List */}

          <div className="space-y-4">

            {
              bugs.map((bug) => (

                <div
                  key={bug.id}
                  className="border p-5 rounded-lg shadow"
                >

                  <h2 className="text-2xl font-bold">
                    {bug.title}
                  </h2>

                  <p className="mt-2">
                    {bug.description}
                  </p>

                  <div className="flex gap-4 mt-4">

                    <span className="bg-yellow-200 px-3 py-1 rounded">

                      {bug.priority}

                    </span>

                    <span className="bg-green-200 px-3 py-1 rounded">

                      {bug.status}

                    </span>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default BugsPage;