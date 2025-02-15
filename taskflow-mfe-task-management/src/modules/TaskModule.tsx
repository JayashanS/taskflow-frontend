import React, { useState } from "react";
import useAuth from "host/useAuth";
import TaskTable from "../components/TaskTable";
import TaskTable_User from "../components/TaskTable_User";
import TaskForm from "../components/TaskForm";
import { Mode } from "../interfaces/globalTypes";
import { Task } from "../interfaces/taskInterface";

const TaskPage: React.FC = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("view");
  const [data, setData] = useState<Task>();

  return (
    <div>
      {user.role === "admin" ? (
        <>
          {mode === "view" && <TaskTable setMode={setMode} setData={setData} />}
          {mode === "edit" && (
            <TaskForm mode={mode} data={data} setMode={setMode} />
          )}
          {mode === "create" && (
            <TaskForm mode={mode} data={data} setMode={setMode} />
          )}
        </>
      ) : (
        <TaskTable_User />
      )}
    </div>
  );
};

export default TaskPage;
