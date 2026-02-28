import workoutReducer from "@/state/workout/workout";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
