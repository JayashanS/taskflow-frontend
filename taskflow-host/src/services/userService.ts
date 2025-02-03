import axios from "axios";
import { User } from "../interfaces/userInterface";

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async (page: number, limit: number) => {
  const response = await axios.get(
    `${API_URL}/users/all-from?page=${page}&limit=${limit}`
  );
  return {
    users: response.data.users,
    totalRecords: response.data.totalRecords,
  };
};

export const updateUserAPI = async (user: User) => {
  const response = await axios.put(`${API_URL}/users/update/${user._id}`, user);
  return response.data;
};

export const deleteUserAPI = async (userId: string) => {
  const response = await axios.delete(`${API_URL}/users/delete/${userId}`);
  return response.data;
};
