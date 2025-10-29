import { Navigate, Outlet } from "react-router-dom";
import { AUTH_PATHS as PATHS } from "./paths/authPaths";
import { useStore } from "@/store";

const ProtectedRoute = () => {
  const user = useStore((store) => store.user);
  return user ? <Outlet /> : <Navigate to={PATHS.LOGIN} />;
};

export default ProtectedRoute;
