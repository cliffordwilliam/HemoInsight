import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRef, useState } from "react";
import { REGISTER } from "../config/queries";
import { useMutation } from "@apollo/client";
import SelectDropdown from "react-native-select-dropdown";
import DatePicker from "react-native-datepicker";

const commorbidityList = [
  "Glucose",
  "Liver",
  "Cholestrol",
  "Hypertension",
  "Thyroid",
  "Sinusitis",
  "Triglycerides",
  "Kidney Failure",
];
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Join us to start checking</Text>
        {/* username */}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => setUsername(text)}
        />
        {/* email */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Format Required"
          onChangeText={(text) => setEmail(text)}
        />
        {/* password */}
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder="Minimal 6 Characters Password"
          secureTextEntry
        />
        {/* birthday */}
        <Text style={styles.label}>Birthdate (dd/mm/yyyy)</Text>
        <TextInput
          style={styles.input}
          placeholder="Birth Date"
          onChangeText={(text) => setBirthdate(text)}
        />
        {/* weight */}
        <Text style={styles.label}>Weight (Kg):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setWeight(text)}
          placeholder="Weight"
        />
        {/* height */}
        <Text style={styles.label}>Height (Cm):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setHeight(text)}
          placeholder="Height"
        />
        {/* address */}
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
        />
        {/* comorbidity */}
        <Text style={styles.label}>Comorbidity (Optional)</Text>
        <Text style={styles.labeldesc}>
          Do you have an existing medical condition? We can recommend health
          services that suits your medical profile.
        </Text>
        <SelectDropdown
          data={commorbidityList}
          onSelect={(selectedItem, index) => setCommorbidity(selectedItem)}
          buttonStyle={styles.input}
          search="true"
        />
        {/* button submit */}
        <Pressable onPress={mutateRegister} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
        {/* kick login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Have an account? Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LandingPage")}>
          <Text style={{ color: "gray", margin: 5, fontSize: 12 }}>
            Hemo Insight Inc.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingTop: 50,
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
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
    marginBottom: 10,
  },
  label: {
    height: 25,
    paddingHorizontal: 8,
    width: "100%",
  },
  labeldesc: {
    height: 25,
    paddingHorizontal: 8,
    width: "100%",
    color: "grey",
    fontSize: 10,
    marginBottom: 10,
  },
  desc: {
    height: 25,
    paddingHorizontal: 8,
    width: "100%",
    marginBottom: 12,
    color: "grey",
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
