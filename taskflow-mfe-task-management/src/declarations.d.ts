/// <reference types="react" />

declare module "remote/Button" {
  const Button: React.FC;
  export default Button;
}

// taskInterface
declare module "host/taskInterface" {
  import { Mode } from "host/globalTypes";

  export interface Task {
    _id: string;
    taskName: string;
    description?: string;
    startDate: string;
    endDate: string;
    assignedUser: string;
    isEnabled: boolean;
    completionDate?: string;
  }

  export interface TaskState {
    tasks: Task[];
    totalRecords: number;
    loading: boolean;
    error: string | null;
  }

  export interface TaskTableProps {
    setMode: (mode: Mode) => void;
    setData: (data: Task) => void;
  }

  export interface TaskFormProps {
    mode: Mode;
    data?: Task;
    setMode: (mode: Mode) => void;
    onSubmit: (data: any) => void;
  }
}

//store
declare module "host/store" {
  import { Store } from "@reduxjs/toolkit";
  import { RootState, AppDispatch } from "./path-to-your-store-file";

  export const store: Store<RootState>;

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}

// taskSlice
declare module "host/taskSlice" {
  import { PayloadAction } from "@reduxjs/toolkit";
  import { ThunkAction } from "@reduxjs/toolkit";
  import { Task, TaskState } from "host/taskInterface";

  export const fetchTasks: (params: {
    page: number;
    limit: number;
  }) => ThunkAction<
    Promise<{ tasks: Task[]; totalRecords: number }>,
    any,
    unknown,
    PayloadAction
  >;

  export const fetchFilteredTasks: any;
  export const fetchFilteredTasksByUserEmail: any;
  export const createTask: any;
  export const editTask: any;
  export const deleteTask: (taskId: string) => Action<any>;
  export const toggleTaskStatus: any;
  export const updateCompletionDate: any;

  export default function taskReducer(state: TaskState, action: any): TaskState;
}

declare module "host/messageSlice" {
  export type MessageState = {
    content: string | null;
    type: "success" | "error" | "info" | "warning" | null;
  };

  // Correct the type for the setMessage action to match the payload structure
  export const setMessage: (payload: {
    content: string;
    type: "success" | "error" | "info" | "warning";
  }) => {
    type: string; // Action type, can be dynamic or fixed
    payload: {
      content: string;
      type: "success" | "error" | "info" | "warning";
    };
  };

  export const clearMessage: () => {
    type: string; // Action type for clearing the message
  };

  export default {
    reducer: any, // Replace with the correct reducer type if necessary
  };
}

// theme provider
declare module "host/ThemeProvider" {
  import { ReactNode } from "react";

  interface ThemeProviderProps {
    children: ReactNode;
  }

  const ThemeProvider: React.FC<ThemeProviderProps>;
  export default ThemeProvider;
}

declare module "host/userSlice" {
  import { User } from "host/userInterface";

  export const searchUsers: any;
}
declare module "host/useAuth" {
  const useAuth: () => { user: any; isAuthenticated: boolean };
  export default useAuth;
}
