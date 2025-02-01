import {
  HashRouter as Router, // Changed from BrowserRouter to HashRouter
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UsersPage from "../pages/UsersPage";
import TasksPage from "../pages/TasksPage";

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />}>
          {/* Redirect root to users page */}
          <Route index element={<Navigate to="/users" replace />} />

          {/* Main routes */}
          <Route path="users" element={<UsersPage />} />
          <Route path="tasks" element={<TasksPage />} />

          {/* Handle invalid URLs */}
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
