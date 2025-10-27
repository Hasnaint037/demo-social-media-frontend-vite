import { Navigate, Outlet } from "react-router-dom";
import { AUTH_PATHS as PATHS } from "./paths/authPaths";

const ProtectedRoute = () => {
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to={PATHS.LOGIN} />;
};

export default ProtectedRoute;
