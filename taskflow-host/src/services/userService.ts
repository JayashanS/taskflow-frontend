import axios from "axios";

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
