// import 'expo-dev-client';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Root from "./src/root";
import { ToastProvider } from "react-native-toast-notifications";
import { UserProvider } from "./src/contexts/UserContext";
import { ChallengeProvider } from "./src/contexts/ChallengeContext";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToastProvider offsetTop={60}>
        <UserProvider>
          <ChallengeProvider>
            <StatusBar backgroundColor={"red"} />
            <Root />
          </ChallengeProvider>
        </UserProvider>
      </ToastProvider>
    </SafeAreaView>
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
