import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskForm from "../components/TaskForm";
import { createTask, editTask } from "host/taskSlice";
import { setMessage } from "host/messageSlice";
import { mockUsers } from "../__mocks__/data/mockUsers";
import { mockTasks } from "../__mocks__/data/mockTasks";

jest.mock("host/taskSlice", () => ({
  createTask: jest.fn(),
  editTask: jest.fn(),
}));

jest.mock("host/messageSlice", () => ({
  setMessage: jest.fn(),
}));

const mockStore = configureStore([]);

describe("TaskForm", () => {
  const setMode = jest.fn();
  const mockOnSubmit = jest.fn();
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null },
      users: {
        users: mockUsers,
        totalRecords: mockUsers.length,
        loading: false,
        error: null,
      },
      tasks: { tasks: mockTasks, totalRecords: 0, loading: false, error: null },
      userSearch: {
        users: mockUsers,
        loading: false,
        error: null,
        searchTerm: "",
      },
      message: { messages: [] },
    });

    store.dispatch = jest.fn();

    (createTask as jest.Mock).mockImplementation(() => ({
      type: "tasks/createTask",
    }));

    (editTask as jest.Mock).mockImplementation(() => ({
      type: "tasks/editTask",
    }));

    (setMessage as jest.Mock).mockImplementation(() => ({
      type: "message/setMessage",
    }));
  });

  it("renders TaskForm component in 'create' mode", async () => {
    render(
      <Provider store={store}>
        <TaskForm mode="create" setMode={setMode} />
      </Provider>
    );

    expect(screen.getByLabelText("Task Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  it("dispatches the createTask action and shows success message", async () => {
    render(
      <Provider store={store}>
        <TaskForm mode="create" setMode={setMode} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Task Name"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-02-01" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2025-02-05" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Create Task/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        setMessage({
          content: "Task created successfully!",
          type: "success",
        })
      );
    });
  });

  it("checks if 'Back' button calls setMode with 'view'", () => {
    render(
      <Provider store={store}>
        <TaskForm mode="create" setMode={setMode} />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Back/i }));

    expect(setMode).toHaveBeenCalledWith("view");
  });
});
