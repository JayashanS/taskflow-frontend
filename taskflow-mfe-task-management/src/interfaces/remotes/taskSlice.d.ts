declare module "host/taskSlice" {
  import { PayloadAction } from "@reduxjs/toolkit";
  import { ThunkAction } from "@reduxjs/toolkit";
  import { Task, TaskState } from "../interfaces/taskInterface";

  export const fetchTasks: any;
  export const fetchFilteredTasks: any;
  export const fetchFilteredTasksByUserEmail: any;
  export const createTask: any;
  export const editTask: any;
  export const deleteTask: (taskId: string) => Action<any>;
  export const toggleTaskStatus: any;
  export const updateCompletionDate: any;

  export default function taskReducer(state: TaskState, action: any): TaskState;
}
