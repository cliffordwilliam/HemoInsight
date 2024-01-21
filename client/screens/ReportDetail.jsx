import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
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
  GET_REPORT_BY_ID,
  SERVICETITLEDESC,
} from "../config/queries";

export default function ReportDetail({ route, navigation }) {
  // params
  const { reportId } = route.params;
  // state
  const [servicesData, setServicesData] = useState([]);
  const [title, setTitle] = useState("");
  let subTotal = 0; // count total price
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
        console.log("ReportDetail page -> onCompleted SERVICETITLEDESC", res);
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
  // press -> kick old page
  const handleBackPress = () => {
    navigation.goBack();
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
      return { color: "red" };
    } else if (status === "paid") {
      // paid style
      return { color: "green" };
    } else {
      return {};
    }
  };
  // helper to render date
  const formatTimestamp = (timestampString) => {
    const timestamp = parseInt(timestampString);
    if (isNaN(timestamp)) {
      return "Invalid Date";
    }
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  // loading?
  if (ReportByIdLoading) {
    return <Text>Loading</Text>;
  }
  // update total price
  ReportById?.report.services.map((service) => {
    subTotal += service.price;
  });
  // render
  return (
    <ScrollView style={styles.background}>
      {/* root con */}
      <View style={styles.con}>
        {/* back button to prev page - SOMETIMES THE DEFAULT IS MISSING */}
        <View style={styles.backButtonCon}>
          <Pressable onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>ReportDetail</Text>
          </Pressable>
        </View>
        {/* report card */}
        {ReportByIdLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.card}>
            {/* title */}
            <Text style={styles.title}>Report Form</Text>
            {/* status */}
            <Text style={getStatusColor(ReportById?.report.status)}>
              Status: {ReportById?.report.status}
            </Text>
            {/* appointment */}
            <Text style={getAppointmentColor(ReportById?.report.appointment)}>
              Appointment: {ReportById?.report.appointment}
            </Text>
            {/* owner card */}
            <View style={styles.profileCard}>
              {ReportById?.report.userOwner && (
                <View style={styles.profileCardTopSection}>
                  {/* owner img */}
                  <Image
                    style={styles.profileCardTopSectionImage}
                    source={{
                      uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg",
                    }}
                  />
                  {/* owner text data con */}
                  <View style={styles.profileCardTopSectionTextCon}>
                    {/* username */}
                    <Text style={styles.profileCardTopSectionUsername}>
                      {ReportById?.report.userOwner.username}
                    </Text>
                    {/* birthdate */}
                    <Text>
                      Birth Date: {ReportById?.report.userOwner.birthdate}
                    </Text>
                    {/* birthdate */}
                    <Text>
                      Commorbidity: {ReportById?.report.userOwner.commorbidity}
                    </Text>
                    {/* dot text con */}
                    <View style={styles.profileCardTopSectionDataCon}>
                      {/*  weight */}
                      <View style={styles.profileCardTopSectionDataValueCon}>
                        {/* dot */}
                        <View
                          style={styles.profileCardTopSectionDataDot}
                        ></View>
                        {/* value */}
                        <Text style={styles.subHeader}>
                          Weight: {ReportById?.report.userOwner.weight} cm
                        </Text>
                      </View>
                      {/*  height */}
                      <View style={styles.profileCardTopSectionDataValueCon}>
                        {/* dot */}
                        <View
                          style={styles.profileCardTopSectionDataDot}
                        ></View>
                        {/* value */}
                        <Text style={styles.subHeader}>
                          Height: {ReportById?.report.userOwner.height} cm
                        </Text>
                      </View>
                      {/*  email */}
                      <View style={styles.profileCardTopSectionDataValueCon}>
                        {/* dot */}
                        <View
                          style={styles.profileCardTopSectionDataDot}
                        ></View>
                        {/* value */}
                        <Text style={styles.subHeader}>
                          Email: {ReportById?.report.userOwner.email}
                        </Text>
                      </View>
                      {/*  created at */}
                      <View style={styles.profileCardTopSectionDataValueCon}>
                        {/* dot */}
                        <View
                          style={styles.profileCardTopSectionDataDot}
                        ></View>
                        {/* value */}
                        <Text style={styles.subHeader}>
                          Date: {formatTimestamp(ReportById?.report.createdAt)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {/* childOwner? */}
              {ReportById?.report.childOwner && (
                <View style={styles.ownerSection}>
                  <Text style={styles.sectionTitle}>Patient Details:</Text>
                  <Text>
                    Full Name: {ReportById?.report.childOwner.username}
                  </Text>
                </View>
              )}
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

                    {ReportById.report.services.map((service, index) => (
                      <View style={styles.addedServiceCard} key={service._id}>
                        {/* title */}
                        <Text style={styles.addedServiceCardTitle}>
                          {index + 1}
                          {"."} {service.title}
                        </Text>
                        {/* clinic */}
                        <Text>Clinic: {service.clinic}</Text>
                        {/* price */}
                        <Text>
                          Price: Rp
                          {service.price}
                          ,000
                        </Text>
                      </View>
                    ))}
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
                      Applicable for Premium Membership only{" "}
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
                    console.log(`Payment Rp ${subTotal},000`);
                  }}
                >
                  <Text style={styles.white}>Checkout</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        <View style={styles.searchSection}>
          <Text style={styles.reportCardTitle}>Look for services here</Text>
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
            <Pressable style={styles.button} onPress={searchServices}>
              <Text style={styles.white}>Search</Text>
            </Pressable>
          </View>

          {/* services container */}
          <View style={styles.con}>
            {/* service card */}
            {servicesData.map((service) => {
              return (
                <View style={styles.serviceCard} key={service._id}>
                  {/* title */}
                  <Text style={styles.serviceCardTitle}>{service.title}</Text>
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
