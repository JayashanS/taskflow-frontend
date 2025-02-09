declare module "host/userSlice" {
  import { PayloadAction } from "@reduxjs/toolkit";
  import { User, UserState } from "../../interfaces/userInterface";
  import { ThunkAction } from "redux-thunk";

  export const fetchUsers: (params: {
    page: number;
    limit: number;
  }) => ThunkAction<
    Promise<{ users: User[]; totalRecords: number }>,
    UserState,
    unknown,
    PayloadAction<{ users: User[]; totalRecords: number }>
  >;

  export const searchUsers: (
    searchTerm: string
  ) => ThunkAction<Promise<User[]>, UserState, unknown, PayloadAction<User[]>>;

  export const createUser: (
    newUser: Omit<User, "_id">
  ) => ThunkAction<Promise<User>, UserState, unknown, PayloadAction<User>>;

  export const editUser: (
    updatedUser: User
  ) => ThunkAction<Promise<User>, UserState, unknown, PayloadAction<User>>;

  export const deleteUser: (
    userId: string
  ) => ThunkAction<Promise<string>, UserState, unknown, PayloadAction<string>>;

  export const inviteUser: (
    email: string
  ) => ThunkAction<Promise<string>, UserState, unknown, PayloadAction<string>>;

  export const toggleUserStatus: (
    userId: string
  ) => ThunkAction<
    Promise<{ userId: string; isEnabled: boolean }>,
    UserState,
    unknown,
    PayloadAction<{ userId: string; isEnabled: boolean }>
  >;

  export default function userReducer(state: UserState, action: any): UserState;
}
