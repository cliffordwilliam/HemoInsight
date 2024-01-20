import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import { LOGGEDINUSER } from "../config/queries";
export default function FamilyMemberList({ navigation }) {
    const [famMember, setFamMember] = useState([]);
    console.log(famMember, `<<<<<< useState`);
    const [funcLoggedIn, { data: loggedInData, loading: loggedInLoading }] =
        useLazyQuery(LOGGEDINUSER, {
            onCompleted: () => {
                console.log("Home page -> onCompleted QueryLOGGEDINUSER");
                setFamMember(loggedInData?.loggedIn?.childs);
            },
        });
    useEffect(() => {
        funcLoggedIn();
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "lightblue",
                        marginVertical: 5,
                        marginHorizontal: 5,
                        borderRadius: 12,
                        padding: 20,
                        gap: 30,
                    }}
                >
                    <Text style={{ fontSize: 25 }}>Member</Text>
                    {famMember.map((member) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("ReportListOfMember", {
                                        ownerId: member._id,
                                    });
                                }}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    marginVertical: 5,
                                    marginHorizontal: 5,
                                    borderRadius: 12,
                                    padding: 20,
                                    gap: 30,
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>
                                    {member.username}
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        padding: 5,
                                        margin: 8,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        width: 110,
                                        height: 50,
                                        fontSize: 15,
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text>Show Reports</Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centerCon: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    button: {
        margin: 5,
        width: 80,
        height: 40,
        backgroundColor: "teal",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    white: {
        color: "white",
    },
    reportCard: {
        backgroundColor: "#fff",
        padding: 16,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "100%",
    },
});
