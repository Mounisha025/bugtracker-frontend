import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axiosConfig";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",

        {
          email,
          password,
        }
      );
      console.log(response.data);

      const token = response.data;

      // Save token
      localStorage.setItem(
        "token",
        token
      );

      console.log("JWT Token:", token);

      // Redirect
      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      setError(
        "Invalid email or password"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Bug Tracker Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-3 rounded-lg"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-3 rounded-lg"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {
            error && (

              <p className="text-red-500">
                {error}
              </p>
            )
          }

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;