import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack initialRouteName="progressRoute">
      <Stack.Screen name="progressRoute" options={{ headerShown: false }} />
    </Stack>
  );
}
