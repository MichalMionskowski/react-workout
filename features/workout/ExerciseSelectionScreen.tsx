import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView } from "react-native";
import exerciseStore, { Exercise } from "../../state/exercise/exercise";
import ExerciseItem from "./components/ExerciseItem";
import useWorkoutExercies from "./hooks/useWorkoutExercies";

export default function ExerciseSelectionScreen() {
  const store = exerciseStore;
  const { bodyPart } = useLocalSearchParams<{ bodyPart: string }>();
  const exercises = useWorkoutExercies({ bodyPart });
  //const dispatch = useDispatch();
  const onPressExercise = (exercise: Exercise) => {
    //dispatch(addExercise(exercise));
    console.log(`adding exercise ${exercise}`);
    store.addExercise(exercise);
  };
  return (
    <ScrollView>
      {exercises?.data?.map((exercise) => (
        <Pressable
          key={exercise.name}
          onPress={() => {
            onPressExercise(exercise);
          }}
        >
          <ExerciseItem exercise={exercise} />
        </Pressable>
      ))}
    </ScrollView>
  );
}
