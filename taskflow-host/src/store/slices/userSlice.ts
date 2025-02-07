import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUsersAPI,
  searchUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  inviteUserAPI,
  toggleUserStatusAPI,
  searchUserIdsAPI,
} from "../../services/userService";
import { User, UserState } from "../../interfaces/userInterface";

const initialState: UserState = {
  users: [],
  totalRecords: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchUsersAPI(page, limit);
      return { users: response.users, totalRecords: response.totalRecords };
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const users = await searchUsersAPI(searchTerm);
      return users;
    } catch (error) {
      return rejectWithValue("Search failed");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser: Omit<User, "_id">, { rejectWithValue }) => {
    try {
      const createdUser = await createUserAPI(newUser);
      return createdUser;
    } catch (error) {
      return rejectWithValue("Failed to create user");
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUser: User, { rejectWithValue }) => {
    try {
      await updateUserAPI(updatedUser);
      return updatedUser;
    } catch (error) {
      return rejectWithValue("Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await deleteUserAPI(userId);
      return userId;
    } catch (error) {
      return rejectWithValue("Failed to delete user");
    }
  }
);

export const inviteUser = createAsyncThunk(
  "users/inviteUser",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await inviteUserAPI(email);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to invite user");
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await toggleUserStatusAPI(userId);
      return { userId, isEnabled: response.isEnabled };
    } catch (error) {
      return rejectWithValue("Failed to toggle user status");
    }
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
      .addCase(
        searchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "No matches found";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.unshift(action.payload);
        state.totalRecords += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create user";
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update user";
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.totalRecords -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete user";
      })
      .addCase(
        toggleUserStatus.fulfilled,
        (
          state,
          action: PayloadAction<{ userId: string; isEnabled: boolean }>
        ) => {
          state.users = state.users.map((user) =>
            user._id === action.payload.userId
              ? { ...user, isEnabled: action.payload.isEnabled }
              : user
          );
        }
      )
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.error = action.error.message || "Failed to toggle user status";
      })
      .addCase(inviteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send email";
      });
  },
});

export default userSlice.reducer;
