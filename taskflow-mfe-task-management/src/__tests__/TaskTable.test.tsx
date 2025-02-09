import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskTable from "../components/TaskTable";
import {
  fetchFilteredTasks,
  deleteTask,
  toggleTaskStatus,
} from "host/taskSlice";
import { mockTasks } from "../__mocks__/data/mockTasks";

jest.mock("host/taskSlice", () => ({
  fetchFilteredTasks: jest.fn(),
  deleteTask: jest.fn(),
  toggleTaskStatus: jest.fn(),
}));

const mockStore = configureStore([]);

describe("TaskTable", () => {
  const setMode = jest.fn();
  const setData = jest.fn();
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null },
      users: { list: [] },
      tasks: {
        tasks: mockTasks,
        totalRecords: mockTasks.length,
        loading: false,
        error: null,
      },
      userSearch: { results: [] },
      message: { messages: [] },
    });

    store.dispatch = jest.fn();

    (fetchFilteredTasks as jest.Mock).mockImplementation(() => ({
      type: "tasks/fetchFilteredTasks",
    }));

    (deleteTask as jest.Mock).mockImplementation(() => ({
      type: "tasks/deleteTask",
    }));

    (toggleTaskStatus as jest.Mock).mockImplementation(() => ({
      type: "tasks/toggleTaskStatus",
    }));
  });

  it("renders TaskTable component", async () => {
    render(
      <Provider store={store}>
        <TaskTable setMode={setMode} setData={setData} />
      </Provider>
    );

    expect(screen.getByText("Task Name")).toBeInTheDocument();
    expect(screen.getByText("Assigned User")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("checks if edit button is clickable and calls setMode and setData", () => {
    render(
      <Provider store={store}>
        <TaskTable setMode={setMode} setData={setData} />
      </Provider>
    );

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    expect(setMode).toHaveBeenCalledWith("edit");
    expect(setData).toHaveBeenCalledWith(expect.objectContaining(mockTasks[0]));
  });
  it("checks if delete button is clickable and dispatches delete action", async () => {
    render(
      <Provider store={store}>
        <TaskTable setMode={setMode} setData={setData} />
      </Provider>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole("button", { name: /yes/i });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      const actions = store.dispatch.mock.calls.map(
        (call: any) => call[0].type
      );
      expect(actions).toEqual(
        expect.arrayContaining(["tasks/deleteTask", "tasks/fetchFilteredTasks"])
      );
    });
  });
});
