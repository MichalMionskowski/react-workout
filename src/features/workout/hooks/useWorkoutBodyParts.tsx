import React, { useEffect } from "react";

export default function useWorkoutBodyParts() {
  const [bodyParts, setBodyParts] = React.useState<BodyPart[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://oss.exercisedb.dev/api/v1/bodyparts",
      );
      const { data }: WorkoutBodyPartResponse = await response.json();
      setBodyParts(data);
    };
    fetchData();
  }, []);

  return bodyParts;
}

export type BodyPart = {
  name: string;
};

type WorkoutBodyPartResponse = {
  data: BodyPart[];
};
