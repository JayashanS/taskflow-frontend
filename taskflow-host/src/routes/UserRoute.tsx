import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role?.toLowerCase() !== "user") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
