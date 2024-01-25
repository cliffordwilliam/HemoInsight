import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://cdn.discordapp.com/attachments/1160037507178696717/1199878289318227978/logo3.png?ex=65c424bc&is=65b1afbc&hm=6aaac0ff9c5147f273b8f6c6751702d9bb4ca7460b2b067f0e5cdeaafa1f34a6&",
        }}
      />
      <View style={styles.buttonCon}>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={styles.buttonSec}
        >
          <Text style={styles.buttonTextSec}>Register</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
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
  },
  buttonCon: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 8,
    gap: 8,
  },
  logo: {
    width: "100%",
    height: "100%",
    marginRight: 8,
    zIndex: -1,
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
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
  buttonSec: {
    backgroundColor: "#ffffff",
    borderColor: "#59BB85",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonTextSec: {
    color: "#59BB85",
    fontWeight: "800",
    textAlign: "center",
  },
  link: {
    marginTop: 12,
    color: "#59BB85",
    fontWeight: "bold",
  },
});
