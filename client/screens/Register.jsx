import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { REGISTER } from "../config/queries";
import { useMutation } from "@apollo/client";

export default function Register({ navigation }) {
  // state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const [commorbidity, setCommorbidity] = useState("");
  // db talk
  const [MutateRegister, { data, loading, error }] = useMutation(REGISTER, {
    onCompleted: () => {
      console.log("Register page -> onCompleted MutateRegister", data);
      navigation.navigate("Login");
    },
    onError: () => {
      console.log("Register page -> onError MutateRegister", error);
    },
  });
  // press -> MutateRegister
  const mutateRegister = () => {
    MutateRegister({
      variables: {
        payload: {
          username,
          email,
          password,
          weight,
          height,
          birthdate,
          address,
          commorbidity,
        },
      },
    });
  };
  // render
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join us to start checking</Text>
      {/* username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      {/* email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      {/* password */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      {/* birthday */}
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        onChangeText={(text) => setBirthdate(text)}
      />
      {/* weight */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setWeight(text)}
        placeholder="Weight"
      />
      {/* height */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setHeight(text)}
        placeholder="Height"
      />
      {/* address */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAddress(text)}
        placeholder="Address"
      />
      {/* comorbidity */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCommorbidity(text)}
        placeholder="Comorbidity"
      />
      {/* button submit */}
      <Pressable onPress={mutateRegister} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      {/* kick login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Have an account? Log in</Text>
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
