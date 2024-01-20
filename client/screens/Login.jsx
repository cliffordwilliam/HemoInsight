import React, { useContext, useState } from "react";
import {
  Button,
  SafeAreaView,
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
    <SafeAreaView style={styles.centerCon}>
      {/* username */}
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {/* password */}
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* button submit */}
      <Button
        style={styles.button}
        onPress={() => mutateLogin()}
        title="Login"
      />
      {/* kick register */}
      <Text>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    margin: 5,
    width: 200,
    height: 40,
    backgroundColor: "lightgray",
    padding: 5,
    borderRadius: 8,
  },
  centerCon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
    width: 80,
    height: 40,
    backgroundColor: "lightblue",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "#3b5998",
    fontWeight: "bold",
  },
});
