import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { email, password }
    );

    if (response.data.token) {
      return response.data.token;
    }

    throw new Error("Invalid credentials");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
