import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getUsers,
  updateUserAPI,
  deleteUserAPI,
} from "../../services/userService";
import { User } from "../../interfaces/userInterface";

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

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await getUsers(page, limit);
    return { page, users: response.users, totalRecords: response.totalRecords };
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUser: User) => {
    await updateUserAPI(updatedUser);
    return updatedUser;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await deleteUserAPI(userId);
    return userId;
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
          state.totalRecords = action.payload.totalRecords;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        Object.keys(state.usersByPage).forEach((page) => {
          state.usersByPage[Number(page)] = state.usersByPage[Number(page)].map(
            (user) => (user._id === action.payload._id ? action.payload : user)
          );
        });
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        Object.keys(state.usersByPage).forEach((page) => {
          state.usersByPage[Number(page)] = state.usersByPage[
            Number(page)
          ].filter((user) => user._id !== action.payload);
        });
        state.totalRecords -= 1;
      });
  },
});

export default userSlice.reducer;
