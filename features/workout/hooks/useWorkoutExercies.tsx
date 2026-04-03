import { useQuery } from "@tanstack/react-query";
import { Exercise } from "../../../state/exercise/exercise";

interface UserWorkoutExercisesProps {
  bodyPart: string;
}

export default function useWorkoutExercises({
  bodyPart,
}: UserWorkoutExercisesProps) {
  const fetchExercises = async () => {
    const response = await fetch(
      `https://oss.exercisedb.dev/api/v1/bodyparts/${bodyPart}/exercises`,
    );
    return response.json();
  };

  const { data, isLoading, error } = useQuery<WorkoutExercisesResponse>({
    queryKey: ["workoutExercises", bodyPart],
    queryFn: fetchExercises,
  });

  return data;
}

type WorkoutExercisesResponse = {
  data: Exercise[];
};
