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
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: "",
    weight: "",
    height: "",
    address: "",
    commorbidity: "",
  });
  // state setter
  const handleChangeInput = (value, key) => {
    setRegisterInput({
      ...registerInput,
      [key]: value,
    });
  };
  // db talk
  const [MutateRegister, { data, loading, error }] = useMutation(REGISTER, {
    onCompleted: (res) => {
      console.log("Register page -> onCompleted MutateRegister", res);
      navigation.navigate("Login");
    },
    onError: (err) => {
      console.log("Register page -> onError MutateRegister", err);
    },
  });
  // press -> MutateRegister
  const RegisterAction = async () => {
    MutateRegister({
      variables: {
        payload: {
          username: registerInput.username,
          email: registerInput.email,
          password: registerInput.password,
          weight: registerInput.weight.toString(),
          height: registerInput.height.toString(),
          birthdate: registerInput.birthdate,
          address: registerInput.address,
          commorbidity: registerInput.commorbidity,
        },
      },
    });
  };
  // render
  return (
    <SafeAreaView style={styles.centerCon}>
      <View style={styles.centerCon}>
        {/* username */}
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(text) => handleChangeInput(text, "username")}
        />
        {/* email */}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => handleChangeInput(text, "email")}
        />
        {/* password */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleChangeInput(text, "password")}
          placeholder="Password"
          secureTextEntry
        />
        <Text>Biodata</Text>
        {/* bday */}
        <TextInput
          style={styles.textInput}
          placeholder="Birth Date"
          onChangeText={(text) => handleChangeInput(text, "birthdate")}
        />
        {/* weight */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleChangeInput(text, "weight")}
          placeholder="Weight"
        />
        {/* height */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleChangeInput(text, "height")}
          placeholder="Height"
        />
        {/* address */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleChangeInput(text, "address")}
          placeholder="Address"
        />
        {/* comorbidity */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleChangeInput(text, "commorbidity")}
          placeholder="Comorbidity"
        />
        {/* button submit */}
        <View style={styles.button}>
          <Pressable onPress={RegisterAction}>
            <Text>Submit</Text>
          </Pressable>
        </View>
        {/* kick login */}
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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
