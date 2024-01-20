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
  // render
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* report card */}
        {ReportByIdLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.reportCard}>
            <Text style={styles.reportCardTitle}>Report Details:</Text>
            <Text>Status: {ReportById?.report.status}</Text>
            {/* added services */}
            {ReportById?.report.services &&
              ReportById.report.services.length > 0 && (
                <React.Fragment>
                  {/* Iterate through services array */}
                  {ReportById.report.services.map((service) => (
                    <View style={styles.serviceCard} key={service._id}>
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
                      <Text>Price: Rp{service.price},000</Text>
                    </View>
                  ))}
                </React.Fragment>
              )}

            {ReportById?.report.userOwner && (
              <View style={styles.ownerSection}>
                <Text style={styles.sectionTitle}>User Owner:</Text>
                <Text>
                  {" "}
                  - Username: {ReportById?.report.userOwner.username}
                </Text>
                <Text> - Email: {ReportById?.report.userOwner.email}</Text>
              </View>
            )}
            {ReportById?.report.childOwner && (
              <View style={styles.ownerSection}>
                <Text style={styles.sectionTitle}>Child Owner:</Text>
                <Text>
                  {" "}
                  - Username: {ReportById?.report.childOwner.username}
                </Text>
              </View>
            )}
            <Text>Appointment: {ReportById?.report.appointment}</Text>
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
          <Pressable style={styles.button} onPress={searchServices}>
            <Text style={styles.buttonText}>Search</Text>
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
                  <Text>Add</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    height: 380,
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
    margin: 8,
    width: "100%",
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
});
