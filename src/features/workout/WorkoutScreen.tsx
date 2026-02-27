import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import ExerciseItem from "./components/ExerciseItem";

const WorkoutScreen = () => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://oss.exercisedb.dev/api/v1/exercises",
      );
      const json = await response.json();

      // Destructure the response - extract data, metadata, and success
      const { data, metadata, success }: ApiResponse = json;

      return { data, metadata, success };
    };

    fetchData().then(({ data, metadata, success }) => {
      // 'data' is the array of exercises
      const exercises: Exercise[] = data;
      // Update the state with the fetched exercises
      setExercises(exercises);
    });

    return () => {
      console.log("WorkoutScreen unmounted");
    };
  }, []);
  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.exerciseId} exercise={exercise} />
      ))}
    </ScrollView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
// Type for the API response structure
type ApiResponse = {
  data: Exercise[];
  metadata: {
    currentPage: number;
    nextPage: string | null;
    previousPage: string | null;
    totalExercises: number;
    totalPages: number;
  };
  success: boolean;
};

// Type for individual exercise
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
