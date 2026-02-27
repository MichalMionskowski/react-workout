import { store } from "@/state/store";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

export default function Index() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
        <Link href="/(tabs)/workout"> HOME </Link>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
