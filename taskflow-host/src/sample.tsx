import React from "react";
const RemoteButton_1 = React.lazy(() => import("admin_dashboard/AdminButton"));
const RemoteButton_2 = React.lazy(() => import("task_management/TaskButton"));
const RemoteButton_3 = React.lazy(() => import("user_dashboard/UserButton"));

const App: React.FC = () => {
  return (
    <div>
      <h1>Host Application</h1>
      <React.Suspense fallback="Loading Button 1...">
        <RemoteButton_1 />
      </React.Suspense>
      <React.Suspense fallback="Loading Button 2...">
        <RemoteButton_2 />
      </React.Suspense>
      <React.Suspense fallback="Loading Button 3...">
        <RemoteButton_3 />
      </React.Suspense>
    </div>
  );
};

export default App;