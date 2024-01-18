import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import { CREATEREPORT } from "../config/queries";
import { GETSERVICES, ADDFAMILY } from "../config/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
export default function CreateReport({ navigation }) {
    const [servicesData, setServicesData] = useState([]);

    //Get Services Data
    const { data: Services } = useQuery(GETSERVICES, {
        onCompleted: () => {
            console.log(`success retrieving data`);
            setServicesData(Services.services);
        },
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        width: 420,
                        height: "100%",
                        backgroundColor: "lightblue",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        alignSelf: "center",
                        borderRadius: 10,
                        marginVertical: 4,
                        padding: 25,
                    }}
                >
                    <Text style={{ fontSize: 30, marginBottom: 12 }}>
                        Appointment Form
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <View>
                            <Text style={{ padding: 5, left: 12 }}>
                                Patient Name
                            </Text>
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 140,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                    left: 12,
                                }}
                                placeholder="Patient"
                                // value={username}
                                // onChangeText={(text) => setUsername(text)}
                            />
                        </View>
                        <View>
                            <Text style={{ padding: 5, left: 12 }}>
                                On Site / Home Service
                            </Text>
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 180,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                    left: 12,
                                }}
                                placeholder="OnSite/OnVisit"
                                // value={username}
                                // onChangeText={(text) => setUsername(text)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <View>
                            <Text style={{ padding: 5, left: 12 }}>
                                Area of Concern
                            </Text>
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 140,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                    left: 12,
                                }}
                                placeholder="Specify here"
                                // value={username}
                                // onChangeText={(text) => setUsername(text)}
                            />
                        </View>
                        <View>
                            <Text style={{ padding: 5, left: 12 }}>
                                Appointment Date
                            </Text>
                            <TextInput
                                style={{
                                    margin: 5,
                                    width: 180,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                    left: 12,
                                    marginBottom: 20,
                                    paddingBottom: 20,
                                }}
                                placeholder="Date"
                                // value={username}
                                // onChangeText={(text) => setUsername(text)}
                            />
                        </View>
                    </View>

                    <View style={{ margin: 12 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginVertical: 20,
                                    paddingVertical: 2,
                                }}
                            >
                                Types of Services
                            </Text>

                            <TextInput
                                style={{
                                    width: 180,
                                    height: 40,
                                    backgroundColor: "white",
                                    padding: 5,
                                    borderRadius: 8,
                                }}
                                placeholder="Search"
                                // value={username}
                                // onChangeText={(text) => setUsername(text)}
                            />
                        </View>

                        <View
                            style={{
                                width: 400,
                                height: 1000,
                                backgroundColor: "white",
                                borderRadius: 18,
                                paddingBottom: 30,
                            }}
                        >
                            <ScrollView>
                                <View style={{ gap: 20 }}>
                                    {servicesData.map((service) => {
                                        return (
                                            <View
                                                style={{
                                                    width: 400,
                                                    height: 320,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginTop: 25,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 300,
                                                        height: 320,
                                                        borderColor:
                                                            "lightblue",
                                                        borderWidth: 3,
                                                        borderRadius: 12,
                                                        flexDirection: "column",
                                                        alignContent:
                                                            "flex-start",
                                                        marginVertical: 12,
                                                        padding: 10,
                                                        justifyContent:
                                                            "space-between",
                                                        margin: 12,
                                                    }}
                                                    key={service._id}
                                                >
                                                    <Text
                                                        style={{
                                                            fontWeight: "700",
                                                            fontSize: 20,
                                                        }}
                                                    >
                                                        {service.title}
                                                    </Text>
                                                    <Text>
                                                        Clinic: {service.clinic}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            backgroundColor:
                                                                "lightgray",
                                                            padding: 9,
                                                            margin: 8,
                                                            width: 270,
                                                            height: 200,
                                                            alignSelf: "center",
                                                        }}
                                                    >
                                                        {service.description}
                                                    </Text>
                                                    <Text>
                                                        Price: Rp{service.price}
                                                        ,000
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Pressable
                                                        onPress={() => {
                                                            console.log(
                                                                service._id
                                                            );
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "teal",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            Add
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
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
