import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { ADDFAMILY, LOGGEDINUSER } from "../config/queries";

export default function AddFamilyMemberForm({ navigation }) {
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const [commorbidity, setCommorbidity] = useState("");
  const [MutateFamMember, { data: AddFamilyResponse }] = useMutation(
    ADDFAMILY,
    {
      onCompleted: async () => {
        console.log(
          "Home page -> onCompleted MutateADDFAMILY",
          AddFamilyResponse
        );
        navigation.navigate("FamilyMember", {
          fromAddFamForm: "fromAddFamForm",
        });
      },
      refetchQueries: [LOGGEDINUSER],
    }
  );
  // press -> MutateFamMember
  const mutateFamMember = () => {
    MutateFamMember({
      variables: {
        payload: {
          username,
          weight: +weight,
          height: +height,
          birthdate,
          address,
          commorbidity,
        },
      },
    });
    setUsername("");
    setWeight("");
    setHeight("");
    setBirthdate("");
    setAddress("");
    setCommorbidity("");
  };
  // render
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* title */}
        <Text style={styles.header}>Add Family Member</Text>
        {/* username */}
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
        />
        {/* birthday */}
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={(text) => setBirthdate(text)}
          placeholder="Birth Date"
        />
        {/* weight */}
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          placeholder="Weight"
        />
        {/* height */}
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={(text) => setHeight(text)}
          placeholder="Height"
        />
        {/* address */}
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
        />
        {/* comorbidity */}
        <TextInput
          style={styles.input}
          value={commorbidity}
          onChangeText={(text) => setCommorbidity(text)}
          placeholder="Comorbidity"
        />
        {/* submit */}
        <Pressable onPress={mutateFamMember} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
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
  card: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
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
});
