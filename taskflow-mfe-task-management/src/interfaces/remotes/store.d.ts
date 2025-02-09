declare module "host/store" {
  import { Store } from "@reduxjs/toolkit";
  import { RootState, AppDispatch } from "./path-to-your-store-file";

  export const store: Store<RootState>;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}
