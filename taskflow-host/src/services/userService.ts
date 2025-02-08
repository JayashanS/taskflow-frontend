import axios from "axios";
import axiosInstance from "./axiosInstance";
import { User } from "../interfaces/userInterface";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsersAPI = async (page: number, limit: number) => {
  const response = await axiosInstance.get(
    `/users/all-from?page=${page}&limit=${limit}`
  );
  return {
    users: response.data.users,
    totalRecords: response.data.totalRecords,
  };
};

export const createUserAPI = async (user: Omit<User, "_id">) => {
  console.log(JSON.stringify(user));
  const response = await axiosInstance.post(`/users/`, user);
  return response.data;
};

export const updateUserAPI = async (user: User) => {
  const response = await axiosInstance.put(`/users/update/${user._id}`, user);
  return response.data;
};

export const deleteUserAPI = async (userId: string) => {
  const response = await axiosInstance.delete(`/users/delete/${userId}`);
  return response.data;
};

export const inviteUserAPI = async (email: string) => {
  const response = await axiosInstance.post(`/users/invite`, { email });
  return response.data;
};

export const searchUsersAPI = async (searchTerm: string) => {
  const response = await axiosInstance.get(`/users/filter`, {
    params: { searchTerm },
  });
  return response.data;
};

export const toggleUserStatusAPI = async (userId: string) => {
  const response = await axiosInstance.post(`/users/toggle/${userId}`);
  return response.data;
};
export const updatePassword = async (
  email: string,
  password: string,
  otp: string
) => {
  try {
    const response = await axios.post(`${API_URL}/users/reset`, {
      email,
      password,
      otp,
    });

    if (response.status === 200) {
      return { success: true, message: "Password updated successfully!" };
    } else {
      return {
        success: false,
        message: response.data.message || "Something went wrong.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Request failed.",
    };
  }
};

export const searchUserIdsAPI = async (searchTerm: string) => {
  const response = await axiosInstance.get(`/users/search`, {
    params: { searchTerm },
  });
  return response.data;
};
