import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UsersPage from "../pages/UsersPage";
import TasksPage from "../pages/TasksPage";
import LoginPage from "../pages/LoginPage";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/users" replace />} />

          {/* Dashboard Layout */}
          <Route element={<Dashboard />}>
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/tasks" element={<TasksPage />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
