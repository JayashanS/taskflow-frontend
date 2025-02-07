import axios from "axios";
import { Task } from "../interfaces/taskInterface";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTasksAPI = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/tasks`, {
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
  const response = await axios.get(`${API_URL}/tasks/filter`, {
    params: { taskName, startDate, endDate, userId, status },
  });
  return response.data;
};

export const createTaskAPI = async (newTask: Omit<Task, "_id">) => {
  const response = await axios.post(`${API_URL}/tasks`, newTask);
  return response.data;
};

export const updateTaskAPI = async (updatedTask: Task) => {
  const response = await axios.put(
    `${API_URL}/tasks/${updatedTask._id}`,
    updatedTask
  );
  return response.data;
};

export const deleteTaskAPI = async (taskId: string) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};

export const toggleTaskStatusAPI = async (taskId: string) => {
  const response = await axios.post(`${API_URL}/tasks/toggle/${taskId}`);
  return response.data;
};

export const updateCompletionDateAPI = async (
  taskId: string,
  completionDate: Date
) => {
  const response = await axios.patch(`${API_URL}/tasks/complete${taskId}`, {
    completionDate,
  });
  return response.data;
};
