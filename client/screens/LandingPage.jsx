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
        <>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FDFEF6",
                }}
            >
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{
                            width: 500,
                            height: 680,
                            marginRight: 10,
                            marginTop: 28,
                        }}
                        source={{
                            url: "https://media.discordapp.net/attachments/1156408374720737322/1197503175687688273/logo3.png?ex=65bb80bd&is=65a90bbd&hm=2830bca092551756d808d947401d7ff14014ba3e7d43d832d8a546ef0e598c0d&",
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 23,
                            fontWeight: "500",
                            color: "white",
                            fontFamily: "lucida grande",
                            fontStyle: "italic",
                            height: 50,
                            backgroundColor: "darkred",
                            width: "100%",
                            textAlign: "center",
                            paddingTop: 15,
                        }}
                    >
                        Begin your healthy journey with us
                    </Text>
                </View>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "darkred",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 80,
                        padding: 30,
                    }}
                >
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                        style={{
                            width: 130,
                            backgroundColor: "maroon",
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 40,
                            borderWidth: 2,
                            borderColor: "ivory",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "800",
                                color: "ivory",
                            }}
                        >
                            Join Us Now
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                        style={{
                            width: 130,
                            backgroundColor: "ivory",
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 40,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "800",
                                color: "darkred",
                            }}
                        >
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </>
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
