import { getAllWorkouts, Workout } from "@/db/workoutRepository";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function WorkoutsList() {
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getAllWorkouts();
      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  return (
    <View>
      {workouts.map((workout) => (
        <Text key={workout.id}>{workout.date}</Text>
      ))}
    </View>
  );
}
