import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTasksAPI,
  fetchFilteredTasksAPI,
  fetchFilteredTasksByUserEmailAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  updateCompletionDateAPI,
  toggleTaskStatusAPI,
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
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchTasksAPI(page, limit);
      return { tasks: response.tasks, totalRecords: response.totalRecords };
    } catch (error) {
      return rejectWithValue("Failed to fetch tasks");
    }
  }
);

export const fetchFilteredTasks = createAsyncThunk(
  "tasks/fetchFilteredTasks",
  async (
    {
      taskName,
      startDate,
      endDate,
      userId,
      status,
    }: {
      taskName?: string;
      startDate?: string;
      endDate?: string;
      userId?: string;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchFilteredTasksAPI({
        taskName,
        startDate,
        endDate,
        userId,
        status,
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch filtered tasks");
    }
  }
);

export const fetchFilteredTasksByUserEmail = createAsyncThunk(
  "tasks/fetchFilteredTasksByUserEmail",
  async (
    {
      email,
      taskName,
      startDate,
      endDate,

      status,
    }: {
      email: string;
      taskName?: string;
      startDate?: string;
      endDate?: string;

      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchFilteredTasksByUserEmailAPI({
        email,
        taskName,
        startDate,
        endDate,

        status,
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch filtered tasks");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask: Omit<Task, "_id">, { rejectWithValue }) => {
    try {
      const createdTask = await createTaskAPI(newTask);
      return createdTask;
    } catch (error) {
      return rejectWithValue("Failed to create task");
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (updatedTask: Task, { rejectWithValue }) => {
    try {
      await updateTaskAPI(updatedTask);
      return updatedTask;
    } catch (error) {
      return rejectWithValue("Failed to update task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await deleteTaskAPI(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue("Failed to delete task");
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleUserStatus",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await toggleTaskStatusAPI(taskId);
      return { taskId, isEnabled: response.isEnabled };
    } catch (error) {
      return rejectWithValue("Failed to toggle task status");
    }
  }
);

export const updateCompletionDate = createAsyncThunk(
  "tasks/updateCompletionDate",
  async (
    { taskId, completionDate }: { taskId: string; completionDate: Date },
    { rejectWithValue }
  ) => {
    try {
      const updatedTask = await updateCompletionDateAPI(taskId, completionDate);
      return updatedTask;
    } catch (error) {
      return rejectWithValue("Failed to update completion date");
    }
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
      .addCase(fetchFilteredTasks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          action.error.message ||
          "Failed to fetch filtered tasks";
      })
      .addCase(
        fetchFilteredTasksByUserEmail.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchFilteredTasksByUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          action.error.message ||
          "Failed to fetch filtered tasks for user";
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
        state.totalRecords += 1;
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(editTask.rejected, (state, action) => {
        state.error =
          action.error.message ||
          action.error.message ||
          "Failed to update task";
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.totalRecords -= 1;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error =
          action.error.message ||
          action.error.message ||
          "Failed to delete task";
      })
      .addCase(
        toggleTaskStatus.fulfilled,
        (
          state,
          action: PayloadAction<{ taskId: string; isEnabled: boolean }>
        ) => {
          state.tasks = state.tasks.map((task) =>
            task._id === action.payload.taskId
              ? { ...task, isEnabled: action.payload.isEnabled }
              : task
          );
        }
      )
      .addCase(toggleTaskStatus.rejected, (state, action) => {
        state.error = action.error.message || "Failed to toggle task status";
      })
      .addCase(
        updateCompletionDate.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.tasks = state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          );
        }
      )
      .addCase(updateCompletionDate.rejected, (state, action) => {
        state.error =
          action.error.message ||
          action.error.message ||
          "Failed to update completion date";
      });
  },
});

export default taskSlice.reducer;
