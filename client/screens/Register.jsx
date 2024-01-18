import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { REGISTER } from "../config/queries";
import { useMutation } from "@apollo/client";
export default function Register({ navigation }) {
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
    const handleChangeInput = (value, key) => {
        setRegisterInput({
            ...registerInput,
            [key]: value,
        });
    };
    const [MutateRegister, { data: RegisterResponse }] = useMutation(REGISTER, {
        onCompleted: () => {
            navigation.navigate("Login");
            console.log(RegisterResponse);
        },
    });

    const RegisterAction = async () => {
        try {
            await MutateRegister({
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
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    placeholder="Username"
                    onChangeText={(text) => handleChangeInput(text, "username")}
                />

                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    placeholder="Email"
                    onChangeText={(text) => handleChangeInput(text, "email")}
                />
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    onChangeText={(text) => handleChangeInput(text, "password")}
                    placeholder="Password"
                    secureTextEntry
                />
                <Text>Biodata</Text>
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    placeholder="Birth Date"
                    onChangeText={(text) =>
                        handleChangeInput(text, "birthdate")
                    }
                />
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    onChangeText={(text) => handleChangeInput(text, "weight")}
                    placeholder="Weight"
                />
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    onChangeText={(text) => handleChangeInput(text, "height")}
                    placeholder="Height"
                />
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    onChangeText={(text) => handleChangeInput(text, "address")}
                    placeholder="Address"
                />
                <TextInput
                    style={{
                        margin: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "lightgray",
                        padding: 5,
                        borderRadius: 8,
                    }}
                    onChangeText={(text) =>
                        handleChangeInput(text, "commorbidity")
                    }
                    placeholder="Comorbidity"
                />
                <View
                    style={{
                        margin: 5,
                        width: 80,
                        height: 40,
                        backgroundColor: "lightblue",
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Pressable onPress={RegisterAction}>
                        <Text>Submit</Text>
                    </Pressable>
                </View>

                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "#3b5998", fontWeight: "bold" }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    logo: {
        position: "absolute",
        left: 14,
        top: 14,
        fontFamily: "AvenirNext-DemiBold",
        fontSize: 34,
        fontWeight: "bold",
        color: "#3b5998",
    },
    icon: {
        left: 320,
        top: 14,
        width: 36,
        height: 36,
        borderRadius: "50",
        borderWidth: 2,
        borderColor: "lightgray",
        backgroundColor: "lightgray",
        alignItems: "center",
        justifyContent: "center",
        margin: 8,
    },

    iconPosition: {
        flexDirection: "row",
    },
    headingContainer: {
        marginTop: 21,
        padding: 10,
        top: 3,
        flexDirection: "row",
        gap: 21,
        alignItems: "center",
        marginLeft: 10,
    },
    PostCardUser: {
        top: 3,
        flexDirection: "row",
        gap: 21,
        alignItems: "center",
        marginLeft: 10,
    },

    writePost: {
        fontFamily: "AvenirNext-DemiBold",
        fontSize: 17,
    },
    imageProfile: {
        width: 43,
        height: 43,
        borderRadius: 50,
    },
    separator: {
        height: 8,
        marginVertical: 12,
        backgroundColor: "lightgray",
    },
    secondarySeperator: {
        height: 1,
        backgroundColor: "lightgray",
    },
    postSeperator: {
        height: 9,
        backgroundColor: "lightgray",
        marginBottom: 13,
    },

    imagePostHeader: {
        width: 43,
        height: 43,
        borderRadius: 20,
        position: "absolute",
        left: 20,
    },
    postContainer: {
        backgroundColor: "gray",
    },
    postHeader: {
        backgroundColor: "blue",
        padding: 10,
        marginBottom: 10,
        fontFamily: "AvenirNext-DemiBold",
        justifyContent: "center",
    },
    usernamePostHeader: {
        marginLeft: 200,
    },
    footerContainer: {
        height: 47,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    footerSubTitle: {
        fontSize: 10,
    },
});
