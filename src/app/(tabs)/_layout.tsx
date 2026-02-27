import { store } from "@/state/store";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs initialRouteName="index">
        <Tabs.Screen name="index" options={{ title: "Index" }} />
        <Tabs.Screen name="home" options={{ title: "Home" }} />
      </Tabs>
    </Provider>
  );
}
