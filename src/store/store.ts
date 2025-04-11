import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import attendanceReducer from "./slices/attendanceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      employee: employeeReducer,
      attendance: attendanceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
