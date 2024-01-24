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
          uri: "https://media.discordapp.net/attachments/1156408374720737322/1197503175687688273/logo3.png?ex=65bb80bd&is=65a90bbd&hm=2830bca092551756d808d947401d7ff14014ba3e7d43d832d8a546ef0e598c0d&",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
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
