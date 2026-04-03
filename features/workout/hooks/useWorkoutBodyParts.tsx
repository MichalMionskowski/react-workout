import { useQuery } from "@tanstack/react-query";

export default function useWorkoutBodyParts() {
  const fetchWorkoutBodyParts = async () => {
    const response = await fetch("https://oss.exercisedb.dev/api/v1/bodyparts");
    return response.json();
  };

  const { data, isLoading, error } = useQuery<WorkoutBodyPartResponse>({
    queryKey: ["workoutBodyParts"],
    queryFn: fetchWorkoutBodyParts,
  });

  return data;
}

export type BodyPart = {
  name: string;
};

type WorkoutBodyPartResponse = {
  data: BodyPart[];
};
