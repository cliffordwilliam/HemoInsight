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
    <SafeAreaView style={styles.centerCon}>
      <View style={styles.centerCon}>
        {/* username */}
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        {/* email */}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        {/* password */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
        <Text>Biodata</Text>
        {/* birthday */}
        <TextInput
          style={styles.textInput}
          placeholder="Birth Date"
          onChangeText={(text) => setBirthdate(text)}
        />
        {/* weight */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setWeight(text)}
          placeholder="Weight"
        />
        {/* height */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setHeight(text)}
          placeholder="Height"
        />
        {/* address */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
        />
        {/* comorbidity */}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setCommorbidity(text)}
          placeholder="Comorbidity"
        />
        {/* button submit */}
        <View style={styles.button}>
          <Pressable onPress={mutateRegister}>
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
