import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import ExerciseItem from "./components/ExerciseItem";
import useWorkoutExercies from "./hooks/useWorkoutExercies";

export default function ExerciseSelectionScreen() {
  const { bodyPart } = useLocalSearchParams<{ bodyPart: string }>();
  const exercises = useWorkoutExercies({ bodyPart });
  return (
    <ScrollView>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.name} exercise={exercise} />
      ))}
    </ScrollView>
  );
}
