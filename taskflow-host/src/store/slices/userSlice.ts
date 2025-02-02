import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUsers } from "../../services/userService";

interface UserState {
  usersByPage: Record<number, any[]>;
  totalRecords: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  usersByPage: {},
  totalRecords: 0,
  loading: false,
  error: null,
};

// Fetch users with pagination
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getUsers(page, limit);
    return { page, users: response.users, totalRecords: response.totalRecords };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            page: number;
            users: any[];
            totalRecords: number;
          }>
        ) => {
          state.loading = false;
          state.usersByPage[action.payload.page] = action.payload.users;
          state.totalRecords = action.payload.totalRecords; // Store total records count
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
