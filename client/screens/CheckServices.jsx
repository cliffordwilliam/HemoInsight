import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    ScrollView,
    TextInput,
    Image,
} from "react-native";
import {
    ADD_SERVICES,
    GETSERVICES,
    GETS_SERVICES_BY_HOSPITAL,
    SERVICETITLEDESC,
} from "../config/queries";

// if premium create report, cron 1min, add credit col to user, 1 time, remind got 1 more credit
export default function CheckServices({ route, navigation }) {
    const [title, setTitle] = useState("");
    const { clinicName } = route.params;
    const [servicesData, setServicesData] = useState([]);
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

    //get services based on hospital
    const { data: ServicesByHospital } = useQuery(GETS_SERVICES_BY_HOSPITAL, {
        variables: { title: clinicName },
        onComplete: () => {
            console.log("Query completed successfully");
        },
        onError: (error) => {
            console.error("Query error:", error);
        },
    });

    // press -> kick old page
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.background}>
            {/* root con */}
            <View style={styles.con}>
                {/* back button to prev page - SOMETIMES THE DEFAULT IS MISSING */}
                <View style={styles.backButtonCon}>
                    <Pressable
                        onPress={handleBackPress}
                        style={styles.backButton}
                    >
                        <Ionicons
                            name="ios-arrow-back"
                            size={24}
                            color="black"
                        />
                        <Text style={styles.backButtonText}>ReportDetail</Text>
                    </Pressable>
                </View>

                {/* search section card */}
                <View style={styles.card}>
                    {/* title */}
                    <Text style={styles.title}>Look for services here</Text>
                    {/* search input container */}
                    <View style={styles.hflex}>
                        {/* search input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Search services"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        {/* submit button */}
                        <Pressable
                            style={styles.button}
                            onPress={searchServices}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </Pressable>
                    </View>

                    {/* services container */}
                    <View style={styles.con}>
                        {/* service card */}
                        {ServicesByHospital?.serviceByHospital?.map(
                            (service) => {
                                return (
                                    <View
                                        style={styles.cardBorder}
                                        key={service._id}
                                    >
                                        {/* title */}
                                        <Text style={styles.serviceCardTitle}>
                                            {service.title}
                                        </Text>
                                        {/* clinic */}
                                        <Text>Clinic: {service.clinic}</Text>
                                        {/* description */}
                                        <Text>{service.description}</Text>
                                        {/* price */}
                                        <Text>
                                            Price: Rp{service.price}
                                            ,000
                                        </Text>
                                        {/* add button */}
                                        {/* <Pressable
                                            onPress={() => {
                                                addServices(service._id);
                                            }}
                                            style={styles.button}
                                        >
                                            <Text style={styles.buttonText}>
                                                Add
                                            </Text>
                                        </Pressable> */}
                                    </View>
                                );
                            }
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 18,
        marginLeft: 5,
    },
    backButtonCon: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 40,
    },
    background: {
        backgroundColor: "#eeeeee",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
    },
    titleTopPush: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 16,
    },
    con: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        gap: 8,
    },
    profileCard: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
    },
    profileCardTopSection: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    profileCardTopSectionImage: {
        width: 110,
        height: 110,
        borderRadius: 8,
    },
    profileCardTopSectionTextCon: {
        flexDirection: "collumn",
        paddingLeft: 16,
    },
    profileCardTopSectionUsername: {
        fontSize: 24,
        fontWeight: "700",
    },
    profileCardTopSectionStatus: {
        fontWeight: "500",
        color: "#59BB85",
    },
    profileCardTopSectionCommorbidity: {
        marginTop: 4,
    },
    profileCardTopSectionDataCon: {
        flexDirection: "column",
        marginTop: 8,
    },
    profileCardTopSectionDataValueCon: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileCardTopSectionDataDot: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: "#59BB85",
        marginRight: 4,
    },
    cardBorder: {
        padding: 16,
        borderRadius: 8,
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        gap: 8,
        borderColor: "lightgrey",
        borderWidth: 1,
    },
    subTotal: {
        fontSize: 15,
        fontStyle: "italic",
        fontWeight: "600",
    },
    total: {
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "600",
    },
    subTotalDisc: {
        fontSize: 12,
        fontStyle: "italic",
    },
    button: {
        backgroundColor: "#59BB85",
        // width: "100%",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "800",
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        // width: "100%",
        flex: 1,
    },
    hflex: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        gap: 6,
    },
    serviceCardTitle: { fontWeight: "700", fontSize: 20 },
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
});
