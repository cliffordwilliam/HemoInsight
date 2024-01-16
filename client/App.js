import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Login from "./screens/Login";
import { LoginProvider } from "./context/LoginContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <View style={styles.container}>
          <Login />
          {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
        </View>
      </LoginProvider>
    </ApolloProvider>
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
