import { createExercise, createWorkout } from "@/db/workoutRepository";
import { RootState } from "@/state/store";
import { clearExercises } from "@/state/workout/workout";
import { Button, Text } from "@react-navigation/elements";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WorkoutsList from "../workout/components/WorkoutsList";

const HomeScreen = ({}) => {
  const exercises = useSelector((state: RootState) => state.workout.exercises);
  const dispatch = useDispatch();
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleFinishWorkout = () => {
    if (exercises.length === 0) {
      Alert.alert(
        "No exercises",
        "Please add at least one exercise before finishing the workout.",
      );
      return;
    }

    try {
      // Create workout wih current date or today's date
      const workoutDate = new Date().toISOString();
      const workoutId = createWorkout(workoutDate);

      // Map and save each exercise
      exercises.forEach((exercise) => {
        createExercise({
          workoutId,
          name: exercise.name,
          gifUrl: exercise.gifUrl,
          bodyParts: exercise.bodyParts?.join(", ") || "",
          equipments: exercise.equipments?.join(", ") || "",
          instructions: exercise.instructions?.join(", ") || "",
          targetMuscles: exercise.targetMuscles?.join(", ") || "",
          secondaryMuscles: exercise.secondaryMuscles?.join(", ") || "",
        });
      });

      // Clear exercises from Redux after successful save
      dispatch(clearExercises());

      // Trigger refresh of workouts list
      setRefreshKey((prev) => prev + 1);

      Alert.alert("Success", "Workout saved successfully!");
    } catch (error) {
      console.error("Error saving workout:", error);
      Alert.alert("Error", "Failed to save workout. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.exercisesContainer}>
        {exercises.length === 0 ? (
          <Text style={styles.emptyText}>No exercises added yet</Text>
        ) : null}
        {exercises.map((exercise, index) => {
          return (
            <View key={exercise.name} style={styles.exerciseCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.exerciseNumber}>#{index + 1}</Text>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.cardDetails}>
                <View style={styles.detailBadgeWide}>
                  <Text style={styles.detailLabel}>Body Parts</Text>
                  <Text style={styles.detailValue}>
                    {exercise.bodyParts?.join(", ") || "N/A"}
                  </Text>
                </View>
              </View>
              {exercise.equipments && exercise.equipments.length > 0 && (
                <View style={styles.equipmentContainer}>
                  <Text style={styles.equipmentLabel}>Equipment: </Text>
                  <Text style={styles.equipmentValue}>
                    {exercise.equipments.join(", ")}
                  </Text>
                </View>
              )}
              {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
                <View style={styles.muscleContainer}>
                  <Text style={styles.muscleLabel}>Target: </Text>
                  <Text style={styles.muscleValue}>
                    {exercise.targetMuscles.join(", ")}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("/workout/workout")}>
          Add exercise
        </Button>
        <Button onPress={handleFinishWorkout}>Finish workout</Button>
      </View>
      <WorkoutsList refreshKey={refreshKey} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  exercisesContainer: {
    padding: 16,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 40,
  },
  exerciseCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3b82f6",
    marginRight: 12,
    minWidth: 30,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailBadge: {
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    minWidth: 80,
  },
  detailBadgeWide: {
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "600",
    textAlign: "center",
    textTransform: "capitalize",
  },
  equipmentContainer: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  equipmentLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  equipmentValue: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "capitalize",
    flex: 1,
  },
  muscleContainer: {
    flexDirection: "row",
    marginTop: 4,
    flexWrap: "wrap",
    alignItems: "center",
  },
  muscleLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  muscleValue: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "capitalize",
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default HomeScreen;
