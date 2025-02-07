import React, { useState } from "react";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import { Mode } from "../interfaces/globaleTypes";
import { Task } from "host/taskInterface";

const TaskPage: React.FC = () => {
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
