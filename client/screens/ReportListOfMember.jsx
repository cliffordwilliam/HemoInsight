import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
  // params
  const OwnerId = route.params.ownerId;
  // state
  const [completed, setCompleted] = useState(false);
  // ONREADY reports based on ownerId
  const { data: reportsData, client: ReportsClient } = useQuery(
    GET_REPORT_BY_OWNERID,
    {
      variables: {
        ownerId: OwnerId,
      },
      onCompleted: () => {
        console.log(
          "ReportListOfMember -> onCompleted QueryGET_REPORT_BY_OWNERID",
          reportsData
        );
      },
    }
  );
  const [deleteMutateReport, { data: deletedReport }] = useMutation(
    DELETE_REPORT,
    {
      onCompleted: () => {
        console.log(
          "ReportListOfMember -> onCompleted MutationDELETE_REPORT",
          deletedReport
        );
      },
      refetchQueries: [GET_REPORT_BY_OWNERID],
    }
  );
  useEffect(() => {
    ReportsClient.resetStore();
  }, [route]);
  // press -> delete report
  const deleteReport = (reportId) => {
    deleteMutateReport({
      variables: {
        reportId: reportId,
      },
    });
  };
  // press -> kick old page
  const handleBackPress = () => {
    navigation.goBack();
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
  // helper to render date
  const formatTimestamp = (timestampString) => {
    const timestamp = parseInt(timestampString);
    if (isNaN(timestamp)) {
      return "Invalid Date";
    }
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  // render
  return (
    <ScrollView style={styles.background}>
      {/* root con */}
      <View style={styles.con}>
        {/* back button to prev page - SOMETIMES THE DEFAULT IS MISSING */}
        <View style={styles.backButtonCon}>
          <Pressable onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>ReportListOfMember</Text>
          </Pressable>
        </View>
        {/* reports */}
        {reportsData?.reportsByOwnerId?.map((report) => {
          return (
            // report card
            <View style={styles.card} key={report._id}>
              {/* owner */}
              {report?.childOwner ? (
                <Text style={styles.cardTitle}>
                  Report for patient: {report?.childOwner?.username}
                </Text>
              ) : (
                <Text style={styles.cardTitle}>
                  Report for patient: {report?.userOwner?.username}
                </Text>
              )}
              {/* status */}
              <Text style={getStatusColor(report?.status)}>
                Status: {report?.status}
              </Text>
              {/* OnSite / OnVisit */}
              <Text>Appointment: {report?.appointment}</Text>
              {/* Craeted at */}
              <Text style={styles.createdAt}>
                Created at: {formatTimestamp(report?.createdAt)}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("ReportDetail", {
                    reportId: report._id,
                  });
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Detail</Text>
              </Pressable>
              {/* paid = confrim btn -> result btn */}
              {report?.status == "paid" ? (
                <>
                  {/* user confirm trigger */}
                  <Pressable
                    onPress={() => {
                      setCompleted(true);
                      console.log("hehe");
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Confirm Completion</Text>
                  </Pressable>
                  {/* user confirmed? */}
                  {completed == true ? (
                    // show result button
                    <Pressable
                      onPress={() => {
                        setCompleted(true);
                        navigation.navigate("Result", {
                          reportId: report._id,
                        });
                      }}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Result</Text>
                    </Pressable>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                // unpaid = checkout + delete button
                <>
                  {/* checkout */}
                  <Pressable
                    onPress={() => {
                      console.log("checkout");
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Checkout</Text>
                  </Pressable>
                  {/* delete */}
                  <Pressable
                    onPress={() => {
                      deleteReport(report?._id);
                    }}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.buttonText}>Cancel Transaction</Text>
                  </Pressable>
                </>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#eeeeee",
  },
  con: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  createdAt: {
    marginBottom: 12,
  },
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
  card: {
    padding: 16,
    borderRadius: 8,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    gap: 4,
  },
  cardTitle: {
    fontWeight: "800",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#59BB85",
    width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#E75E58",
    width: "100%",
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
