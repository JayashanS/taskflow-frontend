import React, { useState } from "react";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import { Mode, User } from "../interfaces/userInterface";

const UsersPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>("view");
  const [data, setData] = useState<User>();

  const handleSubmit = (data: User) => {
    console.log(data);
  };

  return (
    <div>
      {mode === "view" && <UserTable setMode={setMode} setData={setData} />}
      {mode === "edit" && (
        <UserForm
          mode={mode}
          data={data}
          setMode={setMode}
          onSubmit={handleSubmit}
        />
      )}
      {mode === "create" && (
        <UserForm
          mode={mode}
          data={data}
          setMode={setMode}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UsersPage;
