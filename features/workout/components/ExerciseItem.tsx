import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Exercise } from "../../../state/exercise/exercise";

type ExerciseItemProps = {
  exercise: Exercise;
};

function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <View style={styles.cardItem}>
      <View style={styles.exerciseDescription}>
        <Text>{exercise.name}</Text>
        <Text>{exercise.bodyParts.join(", ")}</Text>
        <Text>{exercise.equipments.join(", ")}</Text>
        <Text>{exercise.targetMuscles.join(", ")}</Text>
      </View>
      <Image
        source={{ uri: exercise.gifUrl }}
        style={styles.exerciseImage}
        resizeMode="cover"
      />
    </View>
  );
}

export default ExerciseItem;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  exerciseDescription: {
    flex: 1,
  },
  exerciseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
