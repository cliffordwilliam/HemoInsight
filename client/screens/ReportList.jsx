import { useQuery } from "@apollo/client";
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { REPORTS } from "../config/queries";

export default function ReportList({ navigation }) {
  // ONREADY get reports data
  const {
    data: reportListData,
    loading: reportListLoading,
    error: reportListError,
  } = useQuery(REPORTS);
  // press -> go to detail
  const detailOnPress = (reportId) => {
    navigation.navigate("ReportDetail", { reportId });
  };
  // error? render error
  if (reportListError) {
    return (
      <SafeAreaView style={styles.centerCon}>
        <Text>Error: {reportListError.message}</Text>
      </SafeAreaView>
    );
  }
  // helper to render date
  const formatTimestamp = (timestampString) => {
    const timestamp = parseInt(timestampString);
    if (isNaN(timestamp)) {
      return "Invalid Date";
    }
    const date = new Date(timestamp);
    return date.toLocaleDateString();
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
  // get the appropriate owner color
  const getOwnerColor = (owner) => {
    if (owner === "User Owner") {
      // User Owner style
      return { color: "green" };
    } else if (owner === "Family Owner") {
      // Family Owner style
      return { color: "red" };
    } else {
      return {};
    }
  };
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
  // ok? render
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.centerCon}>
          {/* report list cards */}
          {reportListLoading ? (
            <Text>Loading...</Text>
          ) : (
            reportListData.reports.map((item) => (
              <View style={styles.reportCard} key={item._id}>
                <Text style={getStatusColor(item.status)}>
                  Status: {item.status}
                </Text>
                <Text style={getAppointmentColor(item.appointment)}>
                  Appointment: {item.appointment}
                </Text>
                {item.userOwner && (
                  <Text style={getOwnerColor("User Owner")}>
                    User Owner: {item.userOwner.username}
                  </Text>
                )}
                {item.childOwner && (
                  <Text style={getOwnerColor("Family Owner")}>
                    Family owner: {item.childOwner.username}
                  </Text>
                )}
                <Text>Created at: {formatTimestamp(item.createdAt)}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() => detailOnPress(item._id)}
                >
                  <Text style={styles.white}>detail</Text>
                </Pressable>
              </View>
            ))
          )}
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
