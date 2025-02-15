import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UsersPage from "../pages/UsersPage";
import LoginPage from "../pages/LoginPage";
import WelcomePage from "../pages/WelcomePage";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import FallBackUI from "../components/FallbackUI";

const TaskModule = React.lazy(() => import("task_management/TaskModule"));

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome/*" element={<WelcomePage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route element={<Dashboard />}>
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>
            <Route
              path="/tasks"
              element={
                <Suspense fallback={<FallBackUI />}>
                  <TaskModule />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<UserRoute />}>
          <Route
            path="/tasks"
            element={
              <Suspense fallback={<FallBackUI />}>
                <TaskModule />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
