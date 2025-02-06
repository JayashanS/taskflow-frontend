import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import taskSlice from "./slices/taskSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    tasks: taskSlice,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
