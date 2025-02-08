declare module "host/messageSlice" {
  import { PayloadAction } from "@reduxjs/toolkit";

  export interface MessageState {
    content: string | null;
    type: "success" | "error" | "info" | "warning" | null;
  }

  export const setMessage: (payload: {
    content: string;
    type: "success" | "error" | "info" | "warning";
  }) => {
    type: string;
    payload: {
      content: string;
      type: "success" | "error" | "info" | "warning";
    };
  };

  export const clearMessage: () => PayloadAction<void>;

  export default function messageReducer(
    state: MessageState,
    action: any
  ): MessageState;
}
