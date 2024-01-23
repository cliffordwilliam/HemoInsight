import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../config/queries";
import { LoginContext } from "../context/LoginContext";

export default function Login({ navigation }) {
  // store
  const { setTokenLogin } = useContext(LoginContext);
  // state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // db talk
  const [MutateLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async () => {
      console.log("Login Screen -> MutateLogin onCompleted", data);
      await setTokenLogin(data.login.token);
    },
    onError: async () => {
      console.log("Login Screen -> MutateLogin onError", error);
    },
  });
  // press -> MutateLogin
  const mutateLogin = () => {
    MutateLogin({
      variables: {
        payload: {
          username,
          password,
        },
      },
    });
  };
  // render
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back</Text>
      {/* username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {/* password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* button submit */}
      <Pressable onPress={mutateLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      {/* kick register */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Join us</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "800",
  },
  input: {
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "#59BB85",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
  link: {
    marginTop: 12,
    color: "#59BB85",
    fontWeight: "bold",
  },
});
