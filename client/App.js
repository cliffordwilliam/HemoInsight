import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Login from "./screens/Login";
import { LoginProvider } from "./context/LoginContext";
import MainStack from "./Navigation/MainStack";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <StripeProvider publishableKey="pk_test_51OZsbQLvjPe8rc7Pw3Ipwgy2vRcq0133jIQ4VVMZ8GQRE5kCbCkZHAVHT2kYrzwNQnyfW8X2a7O9wuSrGYseAxqQ00ukrJzqpA">
          <MainStack />
        </StripeProvider>
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
