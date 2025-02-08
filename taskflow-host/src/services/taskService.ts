import axios from "axios";
import axiosInstance from "./axiosInstance";
import { Task } from "../interfaces/taskInterface";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTasksAPI = async (page: number, limit: number) => {
  const response = await axiosInstance.get(`/tasks`, {
    params: { page, limit },
  });
  return response.data;
};

export const fetchFilteredTasksAPI = async ({
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
}) => {
  console.log("fetchFilteredTasksAPI called");
  const response = await axiosInstance.get(`/tasks/filter`, {
    params: { taskName, startDate, endDate, userId, status },
  });
  return response.data;
};

export const fetchFilteredTasksByUserEmailAPI = async ({
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
}) => {
  console.log("fetchFilteredTasksAPI called");
  const response = await axiosInstance.get(`/tasks/filter/user/${email}`, {
    params: { taskName, startDate, endDate, status },
  });
  return response.data;
};

export const createTaskAPI = async (newTask: Omit<Task, "_id">) => {
  const response = await axiosInstance.post(`/tasks`, newTask);
  return response.data;
};

export const updateTaskAPI = async (updatedTask: Task) => {
  const response = await axiosInstance.put(
    `/tasks/${updatedTask._id}`,
    updatedTask
  );
  return response.data;
};

export const deleteTaskAPI = async (taskId: string) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`);
  return response.data;
};

export const toggleTaskStatusAPI = async (taskId: string) => {
  const response = await axiosInstance.post(`/tasks/toggle/${taskId}`);
  return response.data;
};

export const updateCompletionDateAPI = async (
  taskId: string,
  completionDate: Date
) => {
  const response = await axiosInstance.patch(`/tasks/complete/${taskId}`, {
    completionDate,
  });
  return response.data;
};
