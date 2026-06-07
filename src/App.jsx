import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import UsersPage from "./pages/UsersPage";

import ProjectsPage from "./pages/ProjectsPage";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>
      
      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />

      <Route
  path="/projects"
  element={
    <ProtectedRoute>

      <ProjectsPage />

    </ProtectedRoute>
  }
/>


    </Routes>

    
  );
}

export default App;