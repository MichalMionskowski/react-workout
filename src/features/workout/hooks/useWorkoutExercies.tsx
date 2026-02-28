import { useEffect, useState } from "react";
import { Exercise } from "../WorkoutScreen";

interface UserWorkoutExercisesProps {
  bodyPart: string;
}

export default function useWorkoutExercises({
  bodyPart,
}: UserWorkoutExercisesProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  useEffect(() => {
    const data = async () => {
      const response = await fetch(
        `https://oss.exercisedb.dev/api/v1/bodyparts/${bodyPart}/exercises`,
      );
      const json = await response.json();
      const { data } = json;
      console.log(data);

      setExercises(data);
    };
    data();
  }, []);

  return exercises;
}
