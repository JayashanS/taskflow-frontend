declare module "host/userSearchSlice" {
  import { PayloadAction } from "@reduxjs/toolkit";
  import { User, UserSearchState } from "../interfaces/userInterface";

  export const resetSearchState: PayloadAction;
  export const setSearchTerm: PayloadAction<string>;
  export const searchUsers: (
    searchTerm: string
  ) => ThunkAction<
    Promise<User[]>,
    UserSearchState,
    unknown,
    PayloadAction<User[]>
  >;
  export default function userSearchReducer(
    state: UserSearchState,
    action: any
  ): UserSearchState;
}
