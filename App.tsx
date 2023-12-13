import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { RecoilRoot } from "recoil";
import { MineSweeper } from "./src/MineSweeper";

export default function App() {
  return (
    <RecoilRoot>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MineSweeper />
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
