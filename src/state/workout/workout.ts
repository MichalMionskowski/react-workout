import { Exercise } from "@/features/workout/WorkoutScreen";
import { createSlice } from "@reduxjs/toolkit";

interface WorkoutState {
  exercises: Exercise[];
  date: Date;
}

const initialState: WorkoutState = {
  exercises: [],
  date: new Date(),
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    addExercise(state, action) {
      state.exercises.push(action.payload);
    },
  },
});

export const { setDate, addExercise } = workoutSlice.actions;
export default workoutSlice.reducer;
