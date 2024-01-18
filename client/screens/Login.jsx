import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../config/queries";
import { LoginContext } from "../context/LoginContext";

const Login = ({ navigation }) => {
  // store
  const { setTokenLogin, removeTokenLogin } = useContext(LoginContext);
  // state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // db talk
  const [MutateLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      console.log("Login Screen -> MutateLogin onCompleted", res);
      if (res?.login?.token) {
        await setTokenLogin(res.login.token);
      }
    },

    onError: async (res) => {
      console.log("Login Screen -> MutateLogin onError", res);
    },
  });
  // press -> removeTokenLogin
  const logout = async () => {
    await removeTokenLogin();
  };
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
    <View>
      <Text>Login</Text>
      <TextInput
        style={{
          margin: 5,
          width: 140,
          height: 40,
          backgroundColor: "lightgray",
          padding: 5,
        }}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={{
          margin: 5,
          width: 140,
          height: 40,
          backgroundColor: "lightgray",
          padding: 5,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={() => mutateLogin()} title="Login" />
      <Button onPress={() => logout()} title="Logout" />
    </View>
  );
};

export default Login;
