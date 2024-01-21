import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView from "react-native-maps";
import { Marker, Callout, Circle } from "react-native-maps";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import * as Location from "expo-location";
const coordinateData = [
    { latitude: -6.0932714569637625, longitude: 106.74135711224531 },
    { latitude: -6.09068945376936, longitude: 106.74314237060142 },
    { latitude: -6.090901310942518, longitude: 106.74182341172354 },
    { latitude: -6.093476893986374, longitude: 106.74850838310685 },
];

export default function Geolocation() {
    //set

    //states for obtaining current location and region of users.
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    const [radius, setRadius] = useState(500);
    const [address, setAddress] = useState("");

    //these states are for showing current address based on current coordinates
    const [myCity, setMyCity] = useState(null);
    const [myDistrict, setMyDistrict] = useState(null);
    const [streetName, setStreetName] = useState(null);
    const [myCountry, setMyCountry] = useState(null);

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
    // console.log(currentLocation, `<<<<<<<<<<current location`);
    // console.log(initialRegion, `<<<<<<<<<< initial region`);

    //Reversing coordinates to get Address
    const reverseCoordinate = async () => {
        const reverseCoordinateAddress = await Location.reverseGeocodeAsync({
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude,
        });
        setMyCity(reverseCoordinateAddress[0].city);
        setMyCountry(reverseCoordinateAddress[0].country);
        setMyDistrict(reverseCoordinateAddress[0].district);
        setStreetName(reverseCoordinateAddress[0].street);
    };
    const ref = useRef();
    useEffect(() => {
        ref.current?.setAddressText("Some Text");
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
                <Text>Radius : </Text>
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
                {/* <TextInput
                    style={{
                        width: 300,
                        height: 40,
                        backgroundColor: "white",
                        borderRadius: 7,
                        paddingLeft: 10,
                    }}
                    placeholder="address search"
                    value={address}
                    onChangeText={setAddress}
                /> */}

                <View style={{ width: 350, zIndex: 1, flexDirection: "row" }}>
                    <GooglePlacesAutocomplete
                        ref={ref}
                        placeholder="Search"
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(
                                data,
                                details,
                                `ini hasil search <<<<<<<<<<<<<<<<<`
                            );
                        }}
                        query={{
                            key: "AIzaSyDL8RChoRTWFnqmRdVKvPcue0OZ8cZk4vc",
                            language: "en",
                        }}
                        onFail={(error) => console.log(error)}
                    />
                </View>
                {/* 
                <View style={{ zIndex: 2 }}>
                    <Pressable
                        onPress={reverseCoordinate}
                        style={{
                            height: 30,
                            width: 100,
                            backgroundColor: "white",
                            borderRadius: 7,
                            marginTop: 50,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text>Reverse</Text>
                    </Pressable>
                </View> */}
            </View>
            {/* <View>
                <Text
                    style={{
                        height: 80,
                    }}
                >
                    {`${streetName},${myCity},${myDistrict},${myCountry}`}
                </Text>
            </View> */}
            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={initialRegion}>
                    {coordinateData.map((coordinate, index) => {
                        return (
                            <Marker
                                pinColor="red"
                                coordinate={coordinate}
                                key={index}
                            >
                                <Callout>
                                    <Text>Clinic {index + 1}</Text>
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
                            // console.log(e.nativeEvent.coordinate);
                        }}
                    >
                        <Callout>
                            <Text>My current position</Text>
                        </Callout>
                    </Marker>
                    <Circle center={currentLocation} radius={radius} />
                </MapView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
