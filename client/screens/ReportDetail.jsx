import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Pressable,
    ScrollView,
    TextInput,
} from "react-native";
import {
    ADD_SERVICES,
    GETSERVICES,
    GET_REPORT_BY_ID,
    SERVICETITLEDESC,
} from "../config/queries";

export default function ReportDetail({ route, navigation }) {
    // params
    const { reportId } = route.params;
    // state
    const [servicesData, setServicesData] = useState([]);
    const [title, setTitle] = useState("");
    let subTotal = 0;
    // ONREADY get report by id
    const { data: ReportById, loading: ReportByIdLoading } = useQuery(
        GET_REPORT_BY_ID,
        {
            variables: { reportId },
        }
    );
    // ONREADY get Services Data
    const { data: ServicesData, loading: ServicesLoading } = useQuery(
        GETSERVICES,
        {
            onCompleted: () => {
                console.log(
                    `ReportDetail page -> onCompleted QueryGETSERVICES`,
                    ServicesData
                );
                setServicesData(ServicesData.services);
            },
        }
    );
    // get Services data search (on press button)
    const [getServices, { data, loading, error }] = useLazyQuery(
        SERVICETITLEDESC,
        {
            onCompleted: (res) => {
                console.log(
                    "ReportDetail page -> onCompleted SERVICETITLEDESC",
                    res
                );
                setServicesData(res.serviceTitleDescription);
            },
        }
    );
    // press -> QUERY_SERVICE_TITLE_DESC
    const searchServices = () => {
        getServices({
            variables: {
                title: title,
            },
        });
    };
    // press -> add services
    const addServices = (id) => {
        MutateService({
            variables: {
                payload: {
                    serviceId: id,
                    reportId,
                },
            },
        });
    };
    // db talk
    const [MutateService, { data: AddServiceResponse }] = useMutation(
        ADD_SERVICES,
        {
            onCompleted: () => {
                console.log(
                    "ReportDetail page -> onCompleted MutationADD_SERVICES",
                    AddServiceResponse
                );
            },
            refetchQueries: [GET_REPORT_BY_ID],
        }
    );
    // get the appropriate appointment color
    const getAppointmentColor = (appointment) => {
        if (appointment === "OnSite") {
            // OnSite style
            return { color: "green" };
            // OnVisit style
        } else if (appointment === "OnVisit") {
            return { color: "red" };
        } else {
            return {}; // default color or no additional styles
        }
    };
    // get the appropriate status color
    const getStatusColor = (status) => {
        if (status === "unpaid") {
            // unpaid style
            return { color: "red", marginBottom: 10 };
        } else if (status === "paid") {
            // paid style
            return { color: "green", marginBottom: 10 };
        } else {
            return {};
        }
    };
    // render

    ReportById?.report.services.map((service, index) => {
        subTotal += service.price;
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.centerCon}>
                    {/* report card */}
                    {ReportByIdLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <View style={styles.reportCard}>
                            <Text
                                style={{ fontStyle: "italic", color: "gray" }}
                            >
                                Powered by HemoInsight Inc
                            </Text>
                            <Text style={styles.reportCardTitle}>
                                Report Form
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Text
                                    style={getStatusColor(
                                        ReportById?.report.status
                                    )}
                                >
                                    Status: {ReportById?.report.status}
                                </Text>
                            </View>

                            <View
                                style={{
                                    backgroundColor: "lightgray",
                                    padding: 5,
                                    gap: 5,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "lightgray",
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                }}
                            >
                                {ReportById?.report.userOwner && (
                                    <View style={styles.ownerSection}>
                                        <Text style={styles.sectionTitle}>
                                            Patient Details
                                        </Text>

                                        <Text style={styles.subHeader}>
                                            Report Id: {ReportById?.report._id}
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Full Name:{" "}
                                            {
                                                ReportById?.report.userOwner
                                                    .username
                                            }
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Birth Date:{" "}
                                            {
                                                ReportById?.report.userOwner
                                                    .birthdate
                                            }
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Age:{" "}
                                            {ReportById?.report.userOwner.age}
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Height:{" "}
                                            {
                                                ReportById?.report.userOwner
                                                    .height
                                            }{" "}
                                            cm
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Weight:{" "}
                                            {
                                                ReportById?.report.userOwner
                                                    .weight
                                            }{" "}
                                            cm
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Email:{" "}
                                            {ReportById?.report.userOwner.email}
                                        </Text>
                                        <Text style={styles.subHeader}>
                                            Date: {ReportById?.report.createdAt}
                                        </Text>
                                    </View>
                                )}
                                {/* childOwner? */}
                                {ReportById?.report.childOwner && (
                                    <View style={styles.ownerSection}>
                                        <Text style={styles.sectionTitle}>
                                            Patient Details:
                                        </Text>
                                        <Text>
                                            Full Name:{" "}
                                            {
                                                ReportById?.report.childOwner
                                                    .username
                                            }
                                        </Text>
                                    </View>
                                )}
                                {/* appointment */}
                                <Text
                                    style={getAppointmentColor(
                                        ReportById?.report.appointment
                                    )}
                                >
                                    Appointment:{" "}
                                    {ReportById?.report.appointment}
                                </Text>
                                {/* pay button = go to result page */}
                            </View>
                            <View
                                style={{
                                    borderRadius: 2,
                                    minHeight: 600,
                                    height: "auto",
                                    alignContent: "center",
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    paddingBottom: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "400",
                                        paddingTop: 6,
                                        fontSize: 18,
                                        marginHorizontal: 5,
                                        marginTop: 10,
                                        height: 40,
                                        left: 7,
                                    }}
                                >
                                    Blood Test Services :
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignSelf: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 350,
                                            height: 2,
                                            backgroundColor: "gray",
                                            marginVertical: 10,
                                        }}
                                    ></View>
                                </View>

                                {/* added services */}
                                {ReportById?.report.services &&
                                    ReportById.report.services.length > 0 && (
                                        <View style={styles.vflex}>
                                            {/* Iterate through services array */}

                                            {ReportById.report.services.map(
                                                (service, index) => (
                                                    <View
                                                        style={
                                                            styles.addedServiceCard
                                                        }
                                                        key={service._id}
                                                    >
                                                        {/* title */}
                                                        <Text
                                                            style={
                                                                styles.addedServiceCardTitle
                                                            }
                                                        >
                                                            {index + 1}
                                                            {"."}{" "}
                                                            {service.title}
                                                        </Text>
                                                        {/* clinic */}
                                                        <Text>
                                                            Clinic:{" "}
                                                            {service.clinic}
                                                        </Text>
                                                        {/* price */}
                                                        <Text>
                                                            Price: Rp
                                                            {service.price}
                                                            ,000
                                                        </Text>
                                                    </View>
                                                )
                                            )}
                                        </View>
                                    )}
                                {/* userOwner? */}
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        marginTop: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                left: 5,
                                                fontSize: 15,
                                                fontStyle: "italic",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Sub Total Rp: {subTotal}
                                            {".000"}
                                        </Text>
                                        <View>
                                            <Text
                                                style={{
                                                    left: 5,
                                                    fontSize: 12,
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                Member Disc 10%{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    left: 5,
                                                    fontSize: 10,
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                Applicable for Premium
                                                Membership only{" "}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                left: 5,
                                                fontSize: 17,
                                                fontWeight: "700",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            Total Rp: {subTotal * 0.9}
                                            {".000"}
                                        </Text>
                                    </View>
                                </View>
                                {/* {checkout button} */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        marginTop: 8,
                                    }}
                                >
                                    <Pressable
                                        style={styles.button}
                                        onPress={() => {
                                            console.log(
                                                `Payment Rp ${subTotal},000`
                                            );
                                        }}
                                    >
                                        <Text style={styles.white}>
                                            Checkout
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                    <View style={styles.searchSection}>
                        <Text style={styles.reportCardTitle}>
                            Look for services here
                        </Text>
                        {/* search input container */}
                        <View style={styles.hflex}>
                            {/* search input */}
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search services"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                            />
                            {/* submit button */}
                            <Pressable
                                style={styles.button}
                                onPress={searchServices}
                            >
                                <Text style={styles.white}>Search</Text>
                            </Pressable>
                        </View>

                        {/* services container */}
                        <View style={styles.con}>
                            {/* service card */}
                            {servicesData.map((service) => {
                                return (
                                    <View
                                        style={styles.serviceCard}
                                        key={service._id}
                                    >
                                        {/* title */}
                                        <Text style={styles.serviceCardTitle}>
                                            {service.title}
                                        </Text>
                                        {/* clinic */}
                                        <Text>Clinic: {service.clinic}</Text>
                                        {/* description */}
                                        <Text style={styles.serviceCardContent}>
                                            {service.description}
                                        </Text>
                                        {/* price */}
                                        <Text>
                                            Price: Rp{service.price}
                                            ,000
                                        </Text>
                                        {/* add button */}
                                        <Pressable
                                            onPress={() => {
                                                addServices(service._id);
                                            }}
                                            style={styles.button}
                                        >
                                            <Text style={styles.white}>
                                                Add
                                            </Text>
                                        </Pressable>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    hflex: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    vflex: {
        flexDirection: "column",
        gap: 6,
    },
    textInput: {
        margin: 5,
        width: 200,
        height: 40,
        backgroundColor: "lightgray",
        padding: 5,
        borderRadius: 8,
        color: "white",
    },
    serviceCard: {
        width: "100%",
        borderColor: "lightblue",
        borderWidth: 5,
        borderRadius: 10,
        flexDirection: "column",
        marginVertical: 5,
        padding: 10,
        justifyContent: "space-between",
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
    serviceCardTitle: { fontWeight: "700", fontSize: 20 },
    serviceCardContent: {
        backgroundColor: "lightgray",
        padding: 9,
        margin: 8,
    },
    reportCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 16,
        margin: 10,
        width: "100%",
        minHeight: 800,
    },
    addedServiceCard: {
        width: "95%",
        borderColor: "lightblue",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        alignSelf: "center",
    },
    addedServiceCardTitle: {
        fontWeight: "700",
        fontSize: 15,
    },
    reportCardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    ownerSection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    white: {
        color: "white",
    },
    subHeader: {
        fontWeight: "400",
        marginVertical: 1,
        margin: 1,
        fontWeight: "500",
        padding: 1,
    },
    searchSection: {
        width: "auto",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
});
