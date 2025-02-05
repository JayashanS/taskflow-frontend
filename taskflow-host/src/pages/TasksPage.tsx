import React, { useState } from "react";
import { Spin } from "antd";

const TaskList = React.lazy(() => import("task_management/TaskModule"));

const TaskPage: React.FC = () => {
  const fallbackUI = () => {
    const contentStyle: React.CSSProperties = {
      padding: 50,
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: 4,
      textAlign: "center",
    };
    return (
      <Spin tip="Loading..." size="large" style={contentStyle}>
        <div />
      </Spin>
    );
  };

  return (
    <React.Suspense fallback={fallbackUI()}>
      <TaskList />
    </React.Suspense>
  );
};

export default TaskPage;
