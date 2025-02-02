import axios from "axios";

const API_URL = "http://localhost:5000/api/users/login";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}`, { email, password });

    if (response.data.token) {
      return response.data.token;
    }

    throw new Error("Invalid credentials");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
