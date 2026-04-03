import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs initialRouteName="workout">
        <Tabs.Screen
          name="index"
          options={{
            href: null, // Hide from tabs, just used for initial redirect
          }}
        />
        <Tabs.Screen name="workout" options={{ title: "Workout" }} />
        <Tabs.Screen name="progress" options={{ title: "Progress" }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}
