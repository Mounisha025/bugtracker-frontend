import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

function ProjectsPage() {

  const [projects, setProjects] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const response =
        await API.get("/projects");

      setProjects(response.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to fetch projects"
      );
    }
  };

  const handleCreateProject =
    async (e) => {

      e.preventDefault();

      try {

        const newProject = {

          name,
          description,
        };

        await API.post(
          "/projects",
          newProject
        );

        // Clear form
        setName("");
        setDescription("");

        // Refresh projects
        fetchProjects();

      } catch (err) {

        console.error(err);

        setError(
          "Failed to create project"
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
            Projects
          </h1>

          {
            error && (

              <p className="text-red-500 mb-4">
                {error}
              </p>
            )
          }

          {/* Create Project Form */}

          <form
            onSubmit={handleCreateProject}
            className="bg-white shadow p-6 rounded-lg mb-10"
          >

            <h2 className="text-2xl font-bold mb-4">
              Create Project
            </h2>

            <input
              type="text"
              placeholder="Project Name"
              className="w-full border p-3 rounded mb-4"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <textarea
              placeholder="Project Description"
              className="w-full border p-3 rounded mb-4"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded"
            >
              Create Project
            </button>

          </form>

          {/* Projects List */}

          <div className="space-y-4">

            {
              projects.map((project) => (

                <div
                  key={project.id}
                  className="border p-5 rounded-lg shadow"
                >

                  <h2 className="text-2xl font-bold">
                    {project.name}
                  </h2>

                  <p className="mt-2">
                    {project.description}
                  </p>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectsPage;