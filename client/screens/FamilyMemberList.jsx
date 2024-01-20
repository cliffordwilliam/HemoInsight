import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import { CREATEREPORT, LOGGEDINUSER } from "../config/queries";
export default function FamilyMemberList({ navigation }) {
    const [famMember, setFamMember] = useState([]);
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

    const [MutateReport, { data: AddReportResponse }] = useMutation(
        CREATEREPORT,
        {
            onCompleted: async () => {
                console.log(
                    "Home page -> onCompleted MutateCREATEREPORT",
                    AddReportResponse
                );

                navigation.navigate("Reports", {
                    screen: "ReportDetail",
                    params: { reportId: AddReportResponse.createReport._id },
                });
            },
        }
    );

    const createReport = (ownerId, appointment) => {
        MutateReport({
            variables: {
                payload: {
                    ownerId,
                    appointment,
                },
            },
        });
    };
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
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 12,
                            marginTop: 5,
                        }}
                    >
                        <Text style={{ fontSize: 25 }}>Member</Text>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("AddFam");
                            }}
                            style={{
                                width: 35,
                                backgroundColor: "white",
                                height: 35,
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>{"➕"}</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={() => {
                            navigation.navigate("ReportListOfMember", {
                                ownerId: loggedInData?.loggedIn?._id,
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
                            {loggedInData?.loggedIn?.username}
                        </Text>
                        <View>
                            <Pressable
                                onPress={() => {
                                    createReport(
                                        loggedInData?.loggedIn._id,
                                        "OnSite"
                                    );
                                }}
                                style={{
                                    padding: 5,
                                    margin: 8,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    width: 110,
                                    height: 35,
                                    fontSize: 15,
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Book Test</Text>
                            </Pressable>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    padding: 5,
                                    margin: 8,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    width: 110,
                                    height: 35,
                                    fontSize: 15,
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Show Reports</Text>
                            </View>
                        </View>
                    </Pressable>
                    {famMember?.map((member) => {
                        return (
                            <View
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
                                key={member._id}
                            >
                                <Text style={{ fontSize: 20 }}>
                                    {member?.username}
                                </Text>
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            console.log("createReport");
                                        }}
                                        style={{
                                            padding: 5,
                                            margin: 8,
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            width: 110,
                                            height: 35,
                                            fontSize: 15,
                                            justifyContent: "center",
                                            alignContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>Book Test</Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate(
                                                "ReportListOfMember",
                                                {
                                                    ownerId: member._id,
                                                }
                                            );
                                        }}
                                        style={{
                                            backgroundColor: "white",
                                            padding: 5,
                                            margin: 8,
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            width: 110,
                                            height: 35,
                                            fontSize: 15,
                                            justifyContent: "center",
                                            alignContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>Show Reports</Text>
                                    </Pressable>
                                </View>
                            </View>
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
