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
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.centerCon}>
                    {/* report card */}
                    {ReportByIdLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <View style={styles.reportCard}>
                            <Text style={styles.reportCardTitle}>
                                Report Details:
                            </Text>
                            <Text
                                style={getStatusColor(
                                    ReportById?.report.status
                                )}
                            >
                                Status: {ReportById?.report.status}
                            </Text>
                            {/* added services */}
                            {ReportById?.report.services &&
                                ReportById.report.services.length > 0 && (
                                    <View style={styles.vflex}>
                                        {/* Iterate through services array */}
                                        {ReportById.report.services.map(
                                            (service) => (
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
                                                        {service.title}
                                                    </Text>
                                                    {/* clinic */}
                                                    <Text>
                                                        Clinic: {service.clinic}
                                                    </Text>
                                                    {/* description */}
                                                    <Text
                                                        style={
                                                            styles.serviceCardContent
                                                        }
                                                    >
                                                        {service.description}
                                                    </Text>
                                                    {/* price */}
                                                    <Text>
                                                        Price: Rp{service.price}
                                                        ,000
                                                    </Text>
                                                </View>
                                            )
                                        )}
                                    </View>
                                )}
                            {/* userOwner? */}
                            {ReportById?.report.userOwner && (
                                <View style={styles.ownerSection}>
                                    <Text style={styles.sectionTitle}>
                                        User Owner:
                                    </Text>
                                    <Text>
                                        Username:{" "}
                                        {ReportById?.report.userOwner.username}
                                    </Text>
                                    <Text>
                                        Email:{" "}
                                        {ReportById?.report.userOwner.email}
                                    </Text>
                                </View>
                            )}
                            {/* childOwner? */}
                            {ReportById?.report.childOwner && (
                                <View style={styles.ownerSection}>
                                    <Text style={styles.sectionTitle}>
                                        Child Owner:
                                    </Text>
                                    <Text>
                                        Username:{" "}
                                        {ReportById?.report.childOwner.username}
                                    </Text>
                                </View>
                            )}
                            {/* appointment */}
                            <Text
                                style={getAppointmentColor(
                                    ReportById?.report.appointment
                                )}
                            >
                                Appointment: {ReportById?.report.appointment}
                            </Text>
                            {/* pay button = go to result page */}
                            <Pressable
                                style={styles.button}
                                onPress={searchServices}
                            >
                                <Text style={styles.white}>Search</Text>
                            </Pressable>
                        </View>
                    )}
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
                                        <Text style={styles.white}>Add</Text>
                                    </Pressable>
                                </View>
                            );
                        })}
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
        backgroundColor: "white",
        padding: 5,
        borderRadius: 8,
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
    },
    addedServiceCard: {
        width: "100%",
        borderColor: "lightblue",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    addedServiceCardTitle: {
        fontWeight: "700",
        fontSize: 15,
    },
    reportCardTitle: {
        fontSize: 18,
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
});
