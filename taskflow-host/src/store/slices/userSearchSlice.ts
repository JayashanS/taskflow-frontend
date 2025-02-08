import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { searchUserAPI } from "../../services/userService";
import { User, UserSearchState } from "../../interfaces/userInterface";

const initialState: UserSearchState = {
  users: [],
  loading: false,
  error: null,
  searchTerm: "",
};

export const searchUsers = createAsyncThunk(
  "userSearch/searchUsers",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const users = await searchUserAPI(searchTerm);
      return users;
    } catch (error) {
      return rejectWithValue("Failed to search users");
    }
  }
);

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    resetSearchState: (state) => {
      state.users = [];
      state.searchTerm = "";
      state.error = null;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
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
        state.error = action.error.message || "Failed to search users";
      });
  },
});

export const { resetSearchState, setSearchTerm } = userSearchSlice.actions;

export default userSearchSlice.reducer;
