import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  user: { email: string; role: string } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
};

if (initialState.token) {
  try {
    const decoded = jwtDecode<{ email: string; role: string; exp: number }>(
      initialState.token
    );

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
    } else {
      initialState.user = decoded;
      initialState.isAuthenticated = true;
    }
  } catch {
    localStorage.removeItem("token");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      state.token = token;
      state.user = jwtDecode<{ email: string; role: string }>(token);
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
