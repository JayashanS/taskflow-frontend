import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "../../services/userService";
import { User } from "../../interfaces/userInterface";

interface UserState {
  users: User[];
  totalRecords: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  totalRecords: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetchUsersAPI(page, limit);
    return { users: response.users, totalRecords: response.totalRecords };
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser: Omit<User, "_id">) => {
    const createdUser = await createUserAPI(newUser);
    return createdUser;
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
          action: PayloadAction<{ users: User[]; totalRecords: number }>
        ) => {
          state.loading = false;
          state.users = action.payload.users;
          state.totalRecords = action.payload.totalRecords;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.unshift(action.payload);
        state.totalRecords += 1;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.totalRecords -= 1;
      });
  },
});

export default userSlice.reducer;
