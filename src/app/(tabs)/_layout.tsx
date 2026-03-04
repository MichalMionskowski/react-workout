import { store } from "@/state/store";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
