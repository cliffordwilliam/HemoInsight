import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import { DELETE_REPORT, GET_REPORT_BY_OWNERID } from "../config/queries";

export default function ReportListOfMember({ navigation, route }) {
    const OwnerId = route.params.ownerId;
    const [completed, setCompleted] = useState(false);
    //Get reports based on ownerId
    const { data: Reports } = useQuery(GET_REPORT_BY_OWNERID, {
        variables: {
            ownerId: OwnerId,
        },
        onCompleted: () => {
            console.log(`Success Retriving Reports`);
        },
    });

    //Press to delete report
    const deleteReport = async (reportId) => {
        try {
            await deleteFunction({
                variables: {
                    reportId: reportId,
                },
            });
        } catch (error) {
            console.log(error);
        }
        const { data } = useMutation(DELETE_REPORT, {
            variables: {
                reportId: reportId,
            },
        });
        console.log(data, `Success Deleted ID ${reportId}`);
    };
    const [deleteFunction, { data }] = useMutation(DELETE_REPORT, {
        onCompleted: () => {
            console.log("success deletion >>>", data);
        },
        refetchQueries: [GET_REPORT_BY_OWNERID],
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        gap: 10,
                        alignItems: "center",
                        margin: 10,
                    }}
                >
                    {Reports?.reportsByOwnerId?.map((report) => {
                        return (
                            <View
                                style={{
                                    width: 380,
                                    backgroundColor: "white",
                                    padding: 25,
                                    gap: 20,
                                    margin: 2,
                                    borderRadius: 6,
                                }}
                            >
                                <Text style={{ fontWeight: "bold" }}>
                                    Report ID {report._id}
                                </Text>
                                {report?.childOwner ? (
                                    <Text>
                                        Patient :{report?.childOwner?.username}
                                    </Text>
                                ) : (
                                    <Text>
                                        Patient :{report?.userOwner?.username}
                                    </Text>
                                )}

                                <Text>Status:{report?.status}</Text>
                                <Text>Appointment :{report?.appointment}</Text>
                                <Text>Date :{report?.createdAt}</Text>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("ReportDetail", {
                                            reportId: report._id,
                                        });
                                    }}
                                    style={{
                                        width: "100%",
                                        height: 20,
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        borderRadius: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "darkgray",
                                            fontSize: 15,
                                            fontWeight: "800",
                                            alignSelf: "flex-end",
                                            right: 10,
                                        }}
                                    >
                                        Detail
                                    </Text>
                                </Pressable>
                                {report?.status == "paid" ? (
                                    <>
                                        <Pressable
                                            onPress={() => {
                                                setCompleted(true);
                                                console.log("hehe");
                                            }}
                                            style={{
                                                width: "100%",
                                                backgroundColor: "darkred",
                                                height: 40,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                borderRadius: 15,
                                                top: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 15,
                                                    alignSelf: "center",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Confirm Completion
                                            </Text>
                                        </Pressable>
                                        {completed == true ? (
                                            <Pressable
                                                onPress={() => {
                                                    setCompleted(true);
                                                    navigation.navigate(
                                                        "Result",
                                                        {
                                                            reportId:
                                                                report._id,
                                                        }
                                                    );
                                                }}
                                                style={{
                                                    width: "100%",
                                                    backgroundColor:
                                                        "lightblue",
                                                    height: 40,
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    borderRadius: 15,
                                                    top: 10,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "gray",
                                                        fontSize: 15,
                                                        fontWeight: "700",
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    Result
                                                </Text>
                                            </Pressable>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                            alignContent: "center",
                                            height: 100,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: "100%",
                                                backgroundColor: "green",
                                                height: 40,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                borderRadius: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 15,
                                                    alignSelf: "center",
                                                }}
                                            >
                                                Checkout
                                            </Text>
                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                deleteReport(report?._id);
                                            }}
                                            style={{
                                                width: "100%",
                                                backgroundColor: "gray",
                                                height: 40,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                borderRadius: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 15,
                                                    alignSelf: "center",
                                                }}
                                            >
                                                Cancel Transaction
                                            </Text>
                                        </Pressable>
                                    </View>
                                )}
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
