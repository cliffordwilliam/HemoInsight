import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView from "react-native-maps";
import { Marker, Callout, Circle } from "react-native-maps";
import { CREATEREPORT, LOGGEDINUSER } from "../config/queries";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import * as Location from "expo-location";

const dataHospital = [
    {
        name: "Eka Hospital",
        latitude: "-6.093476893986374",
        longitude: "106.74850838310685",
        address:
            "Central Business District, Jl. Boulevard BSD Tim. Lot IX, Lengkong Gudang, Kec. Serpong, Kota Tangerang Selatan, Banten 15321 da",
    },
    {
        name: "RS THT Proklamasi BSD",
        latitude: "-6.2927750318928934",
        longitude: "106.66731684185888",
        address:
            "Jl. Proklamasi No.43, RT.11/RW.2, Pegangsaan, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10320",
    },
    {
        name: "RS Permata Dalima Serpong",
        latitude: "-6.300394446048414",
        longitude: "106.68043363261523",
        address:
            "Jalan Rawa Buntu Utara Sektor I.2, Blok UA No.26-27, Rw. Buntu, Kec. Serpong, Kota Tangerang Selatan, Banten 15311",
    },
    {
        name: "Klinik Pratama & Rumah Bersalin Wijaya Kusuma",
        latitude: "-6.321993354372893",
        longitude: "106.6624810685519",
        address:
            "Jl. Cipeucang, Jl. Kavling Serpong No.30, Serpong, Kec. Serpong, Kota Tangerang Selatan, Banten 15312",
    },
    {
        name: "RSU Hermina Serpong",
        latitude: "-6.345212994007977",
        longitude: "106.68614857052862",
        address:
            "Jl. Raya Puspitek No.km 1 No 99, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
    },
    {
        name: "RS Medika BSD",
        latitude: "-6.281740762960834",
        longitude: "106.66736206705019",
        address:
            "BSD Serpong, Jl. Letnan Sutopo No.7 Kavling Komplek 3A, Lengkong Wetan, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
    },
    {
        name: "RIS Hospital",
        latitude: "-6.2916416367804215",
        longitude: "106.68406101054897",
        address:
            "Jl. Lengkong Gudang Timur Raya No.777, BSD CITY, Kec. Serpong, Kota Tangerang Selatan, Banten 15321",
    },
    {
        name: "RS Ichsan Medical Centre Bintaro",
        latitude: "-6.28876473259024",
        longitude: "106.7056409019661",
        address:
            "Jl. Jombang Raya No.56, Bintaro, Jombang, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414",
    },
    {
        name: "Rumah Sakit Avisena",
        latitude: "-6.281801844910726",
        longitude: "106.70295813844893",
        address:
            "Jl. Jombang Raya No.3, Pd. Pucung, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15227",
    },
    {
        name: "Kelinik Resna",
        latitude: "-6.318770302331121",
        longitude: "106.6657238304205",
        address:
            "Jl. Pjka, Serpong, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
    },
];
export default function Geolocation({ navigation, route }) {
    const [labQuery, setLabQuery] = useState("");
    //create report
    const [funcLoggedIn, { data: loggedInData, loading: loggedInLoading }] =
        useLazyQuery(LOGGEDINUSER, {
            fetchPolicy: "network-only",
            onCompleted: () => {
                console.log(
                    "Home page -> onCompleted QueryLOGGEDINUSER",
                    loggedInData
                );
            },
            refetchQueries: [LOGGEDINUSER],
        });
    useEffect(() => {
        funcLoggedIn();
    }, [route]);
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
                    params: {
                        reportId: AddReportResponse.createReport._id,
                        clinicName: labQuery,
                    },
                });
            },
        }
    );
    // press -> createReport
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

    //set
    const [chooseLab, setChooseLab] = useState({});
    //states for obtaining current location and region of users.
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [radius, setRadius] = useState(500);

    //these states are for showing current address based on current coordinates

    //Permission upon accessing current user's location
    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        };

        getLocation();
    }, []);

    const ref = useRef();
    useEffect(() => {
        ref.current?.setAddressText("Search");
    }, []);

    return (
        <>
            <View
                style={{
                    height: 80,
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: 10,
                }}
            >
                <Text style={{ fontSize: 18, paddingBottom: 3 }}>Radius</Text>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 20,
                    }}
                >
                    <Pressable
                        onPress={() => {
                            setRadius(500);
                        }}
                        style={{
                            width: 80,
                            backgroundColor: "#fff",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}
                    >
                        <Text>500 m</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setRadius(1000);
                        }}
                        style={{
                            width: 80,
                            backgroundColor: "#fff",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}
                    >
                        <Text>1 Km</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setRadius(2000);
                        }}
                        style={{
                            width: 80,
                            backgroundColor: "#fff",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}
                    >
                        <Text>2 Km</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setRadius(3000);
                        }}
                        style={{
                            width: 80,
                            backgroundColor: "#fff",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}
                    >
                        <Text>3 Km</Text>
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 6,
                }}
            >
                <View style={{ width: 350, zIndex: 1, flexDirection: "row" }}>
                    <GooglePlacesAutocomplete
                        ref={ref}
                        placeholder="Search"
                        onPress={(data = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data.description, `ini hasil search`);
                            setChooseLab(data);
                        }}
                        query={{
                            key: "AIzaSyDL8RChoRTWFnqmRdVKvPcue0OZ8cZk4vc",
                            language: "en",
                        }}
                        onFail={(error) => console.log(error)}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={initialRegion}>
                    {dataHospital.map((coordinate, index) => {
                        return (
                            <Marker
                                onPress={() => {
                                    setChooseLab(coordinate);
                                }}
                                pinColor="red"
                                coordinate={{
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
                                }}
                                key={index}
                            >
                                <Callout>
                                    <Text>Clinic {coordinate.name}</Text>
                                </Callout>
                            </Marker>
                        );
                    })}

                    <Marker
                        coordinate={currentLocation}
                        pinColor="black"
                        draggable={true}
                        onDragStart={(e) => {
                            console.log("DragStart", e.nativeEvent.coordinate);
                        }}
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                            });
                        }}
                    >
                        <Callout>
                            <Text>My current position</Text>
                        </Callout>
                    </Marker>
                    <Circle center={currentLocation} radius={radius} />
                </MapView>
                <View style={styles.choosenCard}>
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            marginHorizontal: 8,
                        }}
                    >
                        {chooseLab.description ? (
                            <>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontWeight: 700,
                                    }}
                                >
                                    Clinic :{" "}
                                    {chooseLab?.description?.split(",")[0]}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontWeight: 400,
                                    }}
                                >
                                    Address:
                                    {chooseLab?.description?.split(",")[1]}
                                    {chooseLab?.description?.split(",")[2]}
                                    {chooseLab?.description?.split(",")[3]}
                                    {chooseLab?.description?.split(",")[4]}
                                    {chooseLab?.description?.split(",")[5]}
                                    {chooseLab?.description?.split(",")[6]}
                                </Text>

                                <Pressable
                                    style={{
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontWeight: 400,
                                    }}
                                    onPress={() => {
                                        console.log("create report ");
                                        navigation.navigate("ReportDetail", {
                                            clinicName: chooseLab.name,
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "red",
                                            marginTop: 8,
                                        }}
                                    >
                                        Check Services
                                    </Text>
                                </Pressable>
                            </>
                        ) : chooseLab.name ? (
                            <>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontWeight: 700,
                                    }}
                                >
                                    Clinic : {chooseLab.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontWeight: 400,
                                    }}
                                >
                                    Address:{chooseLab.address}
                                </Text>
                                <Pressable
                                    style={{
                                        fontSize: 18,
                                        textAlign: "left",
                                        fontWeight: 400,
                                    }}
                                    //when click, create report
                                    onPress={() => {
                                        console.log("create report ");
                                        navigation.navigate("CheckServices", {
                                            clinicName: chooseLab.name,
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "red",
                                            marginTop: 8,
                                        }}
                                    >
                                        Check Services
                                    </Text>
                                </Pressable>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        marginVertical: 6,
                                    }}
                                >
                                    <Pressable
                                        onPress={() => {
                                            setLabQuery(chooseLab.name);
                                            createReport(
                                                loggedInData?.loggedIn._id,
                                                "OnVisit"
                                            );
                                        }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>
                                            Book Test On Visit
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            setLabQuery(chooseLab.name);
                                            createReport(
                                                loggedInData?.loggedIn._id,
                                                "OnSite"
                                            );
                                        }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>
                                            Book Test On Site
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        ) : (
                            <Text>Select a Clinic</Text>
                        )}
                    </View>
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
        width: "100%",
        height: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    map: {
        width: "100%",
        height: "70%",
    },
    choosenCard: {
        width: 400,
        height: 160,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 12,
        borderWidth: 1,
        borderColor: "lightgray",
    },
});
