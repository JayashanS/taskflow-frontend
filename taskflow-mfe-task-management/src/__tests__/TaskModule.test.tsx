import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskPage from "../modules/TaskModule";
import useAuth from "host/useAuth";
import { Task } from "host/taskInterface";
import { Mode } from "../interfaces/globalTypes";


const mockTask: Task = {
  _id: "1",
  taskName: "Test Task",
  startDate: "2024-02-09",
  endDate: "2024-02-10",
  assignedUser: "user123",
  assignedUserName: "John Doe",
  isEnabled: true,
};

jest.mock("../components/TaskTable", () => {
  return function MockTaskTable({
    setMode,
    setData,
  }: {
    setMode: (mode: Mode) => void;
    setData: (data: Task) => void;
  }) {
    return (
      <div data-testid="task-table">
        <button
          onClick={() => {
            setMode("edit");
            setData(mockTask);
          }}
        >
          Edit Task
        </button>
        <button onClick={() => setMode("create")}>Create Task</button>
      </div>
    );
  };
});

jest.mock("../components/TaskTable_User", () => {
  return function MockTaskTableUser() {
    return <div data-testid="task-table-user">User Task Table</div>;
  };
});

jest.mock("../components/TaskForm", () => {
  return function MockTaskForm({
    mode,
    data,
    onSubmit,
    setMode,
  }: {
    mode: Mode;
    data?: Task;
    onSubmit: (data: Task) => void;
    setMode: (mode: Mode) => void;
  }) {
    return (
      <div data-testid="task-form">
        <span>Mode: {mode}</span>
        {data && <span>Task ID: {data._id}</span>}
        <button
          onClick={() => {
            onSubmit({
              _id: "1",
              taskName: "Submitted Task",
              startDate: "2024-02-09",
              endDate: "2024-02-10",
              assignedUser: "user123",
              assignedUserName: "John Doe",
              isEnabled: true,
            });
            setMode("view");
          }}
        >
          Submit
        </button>
        <button onClick={() => setMode("view")}>Cancel</button>
      </div>
    );
  };
});

jest.mock("host/useAuth");

describe("TaskPage", () => {
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  describe("Admin View", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: { role: "admin" },
      });
    });

    it("renders TaskTable by default", () => {
      render(<TaskPage />);
      expect(screen.getByTestId("task-table")).toBeInTheDocument();
    });

    it("switches to edit mode when edit button is clicked", () => {
      render(<TaskPage />);
      fireEvent.click(screen.getByText("Edit Task"));
      expect(screen.getByTestId("task-form")).toBeInTheDocument();
      expect(screen.getByText("Mode: edit")).toBeInTheDocument();
      expect(screen.getByText("Task ID: 1")).toBeInTheDocument();
    });

    it("switches to create mode when create button is clicked", () => {
      render(<TaskPage />);
      fireEvent.click(screen.getByText("Create Task"));
      expect(screen.getByTestId("task-form")).toBeInTheDocument();
      expect(screen.getByText("Mode: create")).toBeInTheDocument();
    });

    it("handles form submission and returns to view mode", () => {
      render(<TaskPage />);
      fireEvent.click(screen.getByText("Create Task"));
      fireEvent.click(screen.getByText("Submit"));

      expect(console.log).toHaveBeenCalledWith({
        _id: "1",
        taskName: "Submitted Task",
        startDate: "2024-02-09",
        endDate: "2024-02-10",
        assignedUser: "user123",
        assignedUserName: "John Doe",
        isEnabled: true,
      });

      expect(screen.getByTestId("task-table")).toBeInTheDocument();
    });

    it("returns to view mode when cancel is clicked", () => {
      render(<TaskPage />);
      fireEvent.click(screen.getByText("Create Task"));
      fireEvent.click(screen.getByText("Cancel"));
      expect(screen.getByTestId("task-table")).toBeInTheDocument();
    });
  });

  describe("User View", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: { role: "user" },
      });
    });

    it("renders TaskTable_User for non-admin users", () => {
      render(<TaskPage />);
      expect(screen.getByTestId("task-table-user")).toBeInTheDocument();
    });
  });
});
