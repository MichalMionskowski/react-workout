import { createSlice } from "@reduxjs/toolkit";

interface WorkoutState {
  exercises: Exercise[];
  date: string;
}

export type Exercise = {
  exerciseId: string;
  name: string;
  gifUrl: string;
  bodyParts: string[];
  equipments: string[];
  instructions: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
};

const initialState: WorkoutState = {
  exercises: [],
  date: "",
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
    clearExercises(state) {
      state.exercises = [];
      state.date = "";
    },
  },
});

export const { setDate, addExercise, clearExercises } = workoutSlice.actions;
export default workoutSlice.reducer;
