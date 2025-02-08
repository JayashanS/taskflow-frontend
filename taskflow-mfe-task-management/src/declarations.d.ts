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
    assignedUserName: string;
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

// theme provider
