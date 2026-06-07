import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

function DashboardPage() {

  const [bugs, setBugs] =
    useState([]);

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
    }
  };

  // Statistics

  const totalBugs =
    bugs.length;

  const openBugs =
    bugs.filter(
      (bug) => bug.status === "OPEN"
    ).length;

  const resolvedBugs =
    bugs.filter(
      (bug) => bug.status === "RESOLVED"
    ).length;

  const inProgressBugs =
    bugs.filter(
      (bug) =>
        bug.status === "IN_PROGRESS"
    ).length;

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="p-10 w-full">

          <h1 className="text-4xl font-bold mb-10">

            Dashboard

          </h1>

          {/* Statistics Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Total Bugs */}

            <div className="bg-white shadow-lg rounded-xl p-6">

              <h2 className="text-xl font-bold">

                Total Bugs

              </h2>

              <p className="text-4xl mt-4 font-bold text-blue-500">

                {totalBugs}

              </p>

            </div>

            {/* Open Bugs */}

            <div className="bg-white shadow-lg rounded-xl p-6">

              <h2 className="text-xl font-bold">

                Open Bugs

              </h2>

              <p className="text-4xl mt-4 font-bold text-red-500">

                {openBugs}

              </p>

            </div>

            {/* In Progress */}

            <div className="bg-white shadow-lg rounded-xl p-6">

              <h2 className="text-xl font-bold">

                In Progress

              </h2>

              <p className="text-4xl mt-4 font-bold text-yellow-500">

                {inProgressBugs}

              </p>

            </div>

            {/* Resolved */}

            <div className="bg-white shadow-lg rounded-xl p-6">

              <h2 className="text-xl font-bold">

                Resolved

              </h2>

              <p className="text-4xl mt-4 font-bold text-green-500">

                {resolvedBugs}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;