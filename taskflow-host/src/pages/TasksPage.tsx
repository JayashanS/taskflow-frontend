import React, { useState } from "react";
import { Spin } from "antd";
import TaskTable from "../components/TasksTable";
import TaskForm from "../components/TaskForm";
import { Mode } from "../interfaces/globalTypes";
import { Task } from "../interfaces/taskInterface";
//const TaskList = React.lazy(() => import("task_management/TaskModule"));

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

  const [mode, setMode] = useState<Mode>("view");
  const [data, setData] = useState<Task>();

  const handleSubmit = (data: Task) => {
    console.log(data);
  };

  return (
    <div>
      {mode === "view" && <TaskTable setMode={setMode} setData={setData} />}
      {mode === "edit" && (
        <TaskForm
          mode={mode}
          data={data}
          onSubmit={handleSubmit}
          setMode={setMode}
        />
      )}
      {mode === "create" && (
        <TaskForm
          mode={mode}
          data={data}
          onSubmit={handleSubmit}
          setMode={setMode}
        />
      )}
    </div>
  );
};

export default TaskPage;
