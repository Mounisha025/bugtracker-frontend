import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  // If token not found
  if (!token) {

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;