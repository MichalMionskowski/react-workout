import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BodyPart from "./components/BodyPart";
import useWorkoutBodyParts from "./hooks/useWorkoutBodyParts";

export default function WorkoutSelection() {
  const bodyParts = useWorkoutBodyParts();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {bodyParts?.data?.map((part) => {
          return (
            <BodyPart
              key={part.name}
              name={part.name}
              onPress={(bodyPartName) =>
                router.push(`/(tabs)/workout/${bodyPartName}`)
              }
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
