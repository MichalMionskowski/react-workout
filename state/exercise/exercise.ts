// representation of state using MobX
import {
  action,
  computed,
  makeObservable,
  observable
} from "mobx";
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

interface WorkoutState {
  exercises: Exercise[];
  date: string;
}

const initialState: WorkoutState = {
  exercises: [],
  date: "",
};

class createExerciseStore {
  workutState: WorkoutState = initialState;

  constructor() {
    makeObservable(this, {
      workutState: observable,
      exerciseList: computed,
      addExercise: action,
      clearExercises: action,
    });
  }

  get exerciseList() {
    return this.workutState.exercises;
  }

  addExercise(exercise: Exercise) {
    this.workutState.exercises.push(exercise);
  }

  clearExercises() {
    this.workutState.exercises = [];
  }
}

const exerciseStore = new createExerciseStore();
export default exerciseStore;
