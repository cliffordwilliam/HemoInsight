import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView from "react-native-maps";
import { Marker, Callout, Circle } from "react-native-maps";
import {
  CREATEREPORT,
  LOGGEDINUSER,
  SERVICETITLEDESC,
} from "../config/queries";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import * as Location from "expo-location";

// hardcoded hospitals
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
  // params
  const { ownerId } = route.params;
  const { commorbid } = route.params;
  // state
  const [labQuery, setLabQuery] = useState("");
  const [chooseLab, setChooseLab] = useState({});
  const [recommededLab, setRecommendedLab] = useState([]);
  const [extractedClinic, setExtractredClinic] = useState([]);

  console.log(recommededLab, `INIININNINININI`);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  }); // DO NOT USE NULL - sometimes it is late then it crash
  const [initialRegion, setInitialRegion] = useState(null); // OK
  //get recommendation of services
  const { data: RecommendationResponse } = useQuery(SERVICETITLEDESC, {
    variables: {
      title: commorbid,
    },
    onCompleted: () => {
      console.log(
        "ini data services",
        RecommendationResponse.serviceTitleDescription.length,
        ` ___________________________`
      );
      setRecommendedLab(RecommendationResponse.serviceTitleDescription);
    },
  });

  // create report
  const [MutateReport, { data: AddReportResponse }] = useMutation(
    CREATEREPORT,
    {
      onCompleted: async () => {
        console.log(
          "Home page -> onCompleted MutateCREATEREPORT",
          AddReportResponse
        );
        // kick ReportDetail
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
  const createReport = (appointment, clinicName) => {
    MutateReport({
      variables: {
        payload: {
          ownerId,
          appointment,
          clinicName,
        },
      },
    });
  };
  // ONREADY permission upon accessing current user's location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      // init current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      // init region
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    };
    // call
    getLocation();
  }, []);

  const ref = useRef();
  useEffect(() => {
    ref.current?.setAddressText("Search");
  }, []);

  if (currentLocation.latitude === 0) {
    return;
  }

  // render
  return (
    <>
      {/* map */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* clinics PIN */}
        {dataHospital.map((coordinate, index) => {
          return (
            <Marker
              onPress={() => {
                setChooseLab(coordinate);
              }}
              pinColor="red"
              coordinate={{
                latitude: +coordinate.latitude, // must be int
                longitude: +coordinate.longitude, // must be int
              }}
              key={index}
            >
              <Callout>
                <Text>Clinic {coordinate.name}</Text>
              </Callout>
            </Marker>
          );
        })}
        {/* MY POS PIN */}
        <Marker coordinate={currentLocation} pinColor="black">
          <Callout>
            <Text>My current position</Text>
          </Callout>
        </Marker>
      </MapView>
      {/* choosen lab card WILL STYLE */}
      <View style={styles.choosenCard}>
        {chooseLab.name ? (
          <>
            <Text style={styles.title}>{chooseLab.name}</Text>
            <Text>{chooseLab.address}</Text>
            {/* kick CheckServices  */}
            <Pressable
              style={styles.fullButton}
              onPress={() => {
                navigation.navigate("CheckServices", {
                  clinicName: chooseLab.name,
                });
              }}
            >
              <Text style={styles.buttonText}>Check Services</Text>
            </Pressable>
            <View style={styles.buttonCon}>
              {/* onSite */}
              <Pressable
                style={styles.button}
                onPress={() => {
                  createReport("OnSite", chooseLab.name);
                }}
              >
                <Text style={styles.buttonText}>Onsite</Text>
              </Pressable>
              {/* onVisit */}
              <Pressable
                style={styles.button}
                onPress={() => {
                  createReport("OnVisit", chooseLab.name);
                }}
              >
                <Text style={styles.buttonText}>OnVisit</Text>
              </Pressable>

              {recommededLab.map((lab) => {
                if (lab.clinic == chooseLab.name) {
                  return (
                    <View
                      style={{
                        padding: 2,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        width: 155,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          textAlign: "right",
                          fontStyle: "italic",
                          color: "darkred",
                        }}
                      >
                        Recommended based on patient's comorbidity - {lab.title}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
          </>
        ) : (
          <Text>Choose your lab by pressing the pins above</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  map: {
    width: "100%",
    height: "64%",
  },
  choosenCard: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "column",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  con: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  buttonCon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#59BB85",
    // width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 45,
  },
  fullButton: {
    marginTop: 12,
    backgroundColor: "#59BB85",
    width: "100%",
    // flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
});
