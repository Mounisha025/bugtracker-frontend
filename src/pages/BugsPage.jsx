import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

function BugsPage() {

  // ==============================
  // STATES
  // ==============================

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

    const [searchTerm, setSearchTerm] =
  useState("");

  // ==============================
  // FETCH BUGS ON PAGE LOAD
  // ==============================

  useEffect(() => {

    fetchBugs();

  }, []);

  // ==============================
  // FETCH ALL BUGS
  // ==============================

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

  // ==============================
  // CREATE BUG
  // ==============================

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

        // Refresh bug list
        fetchBugs();

      } catch (err) {

        console.error(err);

        setError(
          "Failed to create bug"
        );
      }
    };

  // ==============================
  // DELETE BUG
  // ==============================

  const handleDeleteBug =
    async (id) => {

      try {

        await API.delete(
          `/bugs/${id}`
        );

        fetchBugs();

      } catch (err) {

        console.error(err);

        setError(
          "Failed to delete bug"
        );
      }
    };

  // ==============================
  // UPDATE BUG STATUS
  // ==============================

  const handleUpdateStatus =
    async (bug, newStatus) => {

      try {

        const updatedBug = {

          ...bug,
          status: newStatus,
        };

        await API.put(
          `/bugs/${bug.id}`,
          updatedBug
        );

        fetchBugs();

      } catch (err) {

        console.error(err);

        setError(
          "Failed to update bug status"
        );
      }
    };

  // ==============================
  // UI
  // ==============================

  const filteredBugs =
  bugs.filter((bug) =>

    bug.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <Navbar />

      <div className="flex">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}

        <div className="p-10 w-full">

          {/* Page Title */}

          <h1 className="text-4xl font-bold mb-8">

            Bugs Management

          </h1>

          {/* Error Message */}

          {
            error && (

              <p className="text-red-500 mb-6">

                {error}

              </p>
            )
          }

          {/* ==============================
              CREATE BUG FORM
          ============================== */}

          <form
            onSubmit={handleCreateBug}
            className="bg-white shadow-lg rounded-xl p-6 mb-10"
          >

            <h2 className="text-2xl font-bold mb-6">

              Create New Bug

            </h2>

            {/* Title */}

            <input
              type="text"
              placeholder="Bug Title"
              className="w-full border p-3 rounded-lg mb-4"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

            {/* Description */}

            <textarea
              placeholder="Bug Description"
              className="w-full border p-3 rounded-lg mb-4"
              rows="4"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

            {/* Priority Dropdown */}

            <select
              className="w-full border p-3 rounded-lg mb-4"
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

            {/* Status Dropdown */}

            <select
              className="w-full border p-3 rounded-lg mb-6"
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

            {/* Submit Button */}

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
            >

              Create Bug

            </button>

          </form>

     {/* Search Bar */}

<div className="bg-white shadow-lg rounded-xl p-4 mb-6">

  <input
    type="text"
    placeholder="Search bugs..."
    className="w-full border-2 border-blue-400 p-4 rounded-lg"
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />

</div>  

          {/* ==============================
              BUGS LIST
          ============================== */}

          <div className="space-y-6">

            {
              filteredBugs.map((bug) => (

                <div
                  key={bug.id}
                  className="bg-white shadow-lg rounded-xl p-6"
                >

                  {/* Title */}

                  <h2 className="text-2xl font-bold">

                    {bug.title}

                  </h2>

                  {/* Description */}

                  <p className="mt-3 text-gray-700">

                    {bug.description}

                  </p>

                  {/* Priority + Status */}

                  <div className="flex gap-4 mt-5 items-center flex-wrap">

                    {/* Priority */}

                    <span className="bg-yellow-200 px-4 py-2 rounded-lg font-medium">

                      {bug.priority}

                    </span>

                    {/* Status */}

                    <span
  className={`px-4 py-2 rounded-lg font-medium text-white

    ${bug.status === "OPEN"
      ? "bg-red-500"
      : ""}

    ${bug.status === "IN_PROGRESS"
      ? "bg-yellow-500"
      : ""}

    ${bug.status === "RESOLVED"
      ? "bg-green-500"
      : ""}
  `}
>

  {bug.status}

</span>

                    {/* Update Status */}

                    <select
                      value={bug.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          bug,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded-lg"
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

                    {/* Delete Button */}

                    <button
                      onClick={() =>
                        handleDeleteBug(bug.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >

                      Delete

                    </button>

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