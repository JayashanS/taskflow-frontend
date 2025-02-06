import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTasksAPI,
  fetchFilteredTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  updateCompletionDateAPI,
} from "../../services/taskService";
import { Task, TaskState } from "../../interfaces/taskInterface";

const initialState: TaskState = {
  tasks: [],
  totalRecords: 0,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetchTasksAPI(page, limit);
    return { tasks: response.tasks, totalRecords: response.totalRecords };
  }
);

export const fetchFilteredTasks = createAsyncThunk(
  "tasks/fetchFilteredTasks",
  async ({
    taskName,
    startDate,
    endDate,
    userId,
  }: {
    taskName?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
  }) => {
    const response = await fetchFilteredTasksAPI({
      taskName,
      startDate,
      endDate,
      userId,
    });
    return response;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask: Omit<Task, "_id">) => {
    const createdTask = await createTaskAPI(newTask);
    return createdTask;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (updatedTask: Task) => {
    await updateTaskAPI(updatedTask);
    return updatedTask;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await deleteTaskAPI(taskId);
    return taskId;
  }
);

export const updateCompletionDate = createAsyncThunk(
  "tasks/updateCompletionDate",
  async ({
    taskId,
    completionDate,
  }: {
    taskId: string;
    completionDate: Date;
  }) => {
    const updatedTask = await updateCompletionDateAPI(taskId, completionDate);
    return updatedTask;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (
          state,
          action: PayloadAction<{ tasks: Task[]; totalRecords: number }>
        ) => {
          state.loading = false;
          state.tasks = action.payload.tasks;
          state.totalRecords = action.payload.totalRecords;
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(
        fetchFilteredTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
        state.totalRecords += 1;
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.totalRecords -= 1;
      })
      .addCase(
        updateCompletionDate.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.tasks = state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          );
        }
      );
  },
});

export default taskSlice.reducer;
