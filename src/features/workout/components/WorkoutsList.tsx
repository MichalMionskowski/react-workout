import { getAllWorkouts, Workout } from "@/db/workoutRepository";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface WorkoutsListProps {
  refreshKey?: number;
}

export default function WorkoutsList({ refreshKey }: WorkoutsListProps) {
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllWorkouts();
        console.log("Fetched workouts:", data);
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Failed to load workouts");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [refreshKey]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (workouts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No saved workouts yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Previous Workouts</Text>
      {workouts.map((workout) => (
        <View key={workout.id} style={styles.workoutCard}>
          <Text style={styles.workoutDate}>
            {new Date(workout.date).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centerContainer: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  workoutCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: "#10b981",
  },
  workoutDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
  },
});
