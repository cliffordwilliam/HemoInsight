import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { GETSERVICES, ADDFAMILY } from "../config/queries";
import { useQuery, useMutation } from "@apollo/client";

export default function Homepage({ navigation }) {
    const [servicesData, setServicesData] = useState([]);
    const [familyMember, setFamilyMember] = useState({
        username: "",
        birthdate: "",
        address: "",
        commorbidity: "",
    });

    //Logout Section
    const { removeTokenLogin } = useContext(LoginContext);
    const handleLogout = async () => {
        console.log("Home screen logout");
        await removeTokenLogin();
    };

    //Get Services Data
    const { data: Services } = useQuery(GETSERVICES, {
        onCompleted: () => {
            console.log(`success retrieving data`);
            setServicesData(Services.services);
        },
    });

    //Add Family Member
    const handleChangeInput = (value, key) => {
        setFamilyMember({
            ...familyMember,
            [key]: value,
        });
    };

    const [MutateFamMember, { data: AddFamilyResponse }] = useMutation(
        ADDFAMILY,
        {
            onCompleted: () => {
                console.log(AddFamilyResponse);
            },
        }
    );

    const AddFamilyMemberAction = async () => {
        try {
            await MutateFamMember({
                variables: {
                    payload: {
                        username: familyMember.username,
                        birthdate: familyMember.birthdate,
                        address: familyMember.address,
                        commorbidity: familyMember.commorbidity,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 370,
                            height: 250,
                            backgroundColor: "teal",
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>
                            User Profile Card here{" "}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 350,
                                height: 350,
                                backgroundColor: "lightblue",
                                borderRadius: 20,
                                marginHorizontal: 4,
                                marginVertical: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>My Family Member</Text>
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                }}
                                placeholder="Username"
                                onChangeText={(text) =>
                                    handleChangeInput(text, "username")
                                }
                            />
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                }}
                                placeholder="Birthdate"
                                onChangeText={(text) =>
                                    handleChangeInput(text, "birthdate")
                                }
                            />
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                }}
                                placeholder="Address"
                                onChangeText={(text) =>
                                    handleChangeInput(text, "address")
                                }
                            />
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                }}
                                placeholder="Comorbidity"
                                onChangeText={(text) =>
                                    handleChangeInput(text, "commorbidity")
                                }
                            />

                            <Pressable
                                onPress={AddFamilyMemberAction}
                                style={{
                                    width: 60,
                                    height: 30,
                                    backgroundColor: "teal",
                                    borderRadius: 7,
                                }}
                            >
                                <Text>Submit</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            gap: 6,
                        }}
                    >
                        <View>
                            <Pressable
                                onClick
                                style={{
                                    width: 110,
                                    height: 110,
                                    backgroundColor: "lightblue",
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontSize: 17, padding: 4 }}>
                                    My Health Record
                                </Text>
                            </Pressable>
                        </View>

                        <View>
                            <Pressable
                                style={{
                                    width: 110,
                                    height: 110,
                                    backgroundColor: "lightblue",
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        padding: 2,
                                        marginHorizontal: 2,
                                    }}
                                >
                                    Create Appointment
                                </Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable
                                onPress={handleLogout}
                                style={{
                                    width: 110,
                                    height: 110,
                                    backgroundColor: "pink",
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        padding: 4,
                                    }}
                                >
                                    Logout
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    {servicesData.map((service) => {
                        return (
                            <View
                                style={{
                                    width: 300,
                                    height: 280,
                                    borderColor: "lightblue",
                                    borderWidth: 5,
                                    borderRadius: 10,
                                    flexDirection: "column",
                                    alignContent: "flex-start",
                                    marginVertical: 5,
                                    padding: 10,
                                    justifyContent: "space-between",
                                }}
                                key={service._id}
                            >
                                <Text
                                    style={{ fontWeight: "700", fontSize: 20 }}
                                >
                                    {service.title}
                                </Text>
                                <Text>Clinic: {service.clinic}</Text>
                                <Text
                                    style={{
                                        backgroundColor: "lightgray",
                                        padding: 9,
                                        margin: 8,
                                    }}
                                >
                                    {service.description}
                                </Text>
                                <Text>Price: Rp{service.price},000</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
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
