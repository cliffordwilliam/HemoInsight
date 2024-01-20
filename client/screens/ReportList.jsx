import { useQuery } from "@apollo/client";
import React from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { REPORTS } from "../config/queries";

export default function ReportList({ navigation }) {
  const { data: reportListData, loading, error } = useQuery(REPORTS);

  // Check for loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.centerCon}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Check for error
  if (error) {
    return (
      <SafeAreaView style={styles.centerCon}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const detailOnPress = (reportId) => {
    navigation.navigate("ReportDetail", { reportId });
  };

  // Render the reports using FlatList
  return (
    <SafeAreaView style={styles.centerCon}>
      <Text>Reports</Text>
      <FlatList
        data={reportListData.reports}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.reportCard} key={item._id}>
            <Text>Status: {item.status}</Text>
            <Text>Appointment: {item.appointment}</Text>
            {/* Render other details as needed */}
            <Pressable
              style={styles.postContainer}
              onPress={() => detailOnPress(item._id)}
            >
              <Text>detail</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reportCard: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
