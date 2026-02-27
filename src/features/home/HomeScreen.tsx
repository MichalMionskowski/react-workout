import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Button onPress={() => router.push("/workout/workout")}>
        Start workout
      </Button>
    </View>
  );
};

export default HomeScreen;
