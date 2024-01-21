import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { CREATEREPORT, LOGGEDINUSER } from "../config/queries";
export default function FamilyMemberList({ navigation, route }) {
  const [famMember, setFamMember] = useState([]);
  const [funcLoggedIn, { data: loggedInData, loading: loggedInLoading }] =
    useLazyQuery(LOGGEDINUSER, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        console.log("Home page -> onCompleted QueryLOGGEDINUSER", loggedInData);
        setFamMember(loggedInData?.loggedIn?.childs);
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
          params: { reportId: AddReportResponse.createReport._id },
        });
      },
    }
  );

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
  if (loggedInLoading) {
    return <Text>Loading</Text>;
  }
  // render
  return (
    <ScrollView style={styles.background}>
      {/* root con */}
      <View style={styles.con}>
        {/* add fam button */}
        <Pressable
          onPress={() => {
            navigation.navigate("AddFam");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add a member</Text>
        </Pressable>
        {/* user title */}
        <Text style={styles.title}>User</Text>
        {/* owner card */}
        <View style={styles.card}>
          {/* button con */}
          <View style={styles.buttonCon}>
            {/* create report on site */}
            <Pressable
              onPress={() => {
                createReport(loggedInData?.loggedIn._id, "OnSite");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Book Test On Site</Text>
            </Pressable>
            {/* create report on visit */}
            <Pressable
              onPress={() => {
                createReport(loggedInData?.loggedIn._id, "OnVisit");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Book Test On Visit</Text>
            </Pressable>
            {/* kick list of reports */}
            <Pressable
              onPress={() => {
                navigation.navigate("ReportListOfMember", {
                  ownerId: loggedInData?.loggedIn?._id,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Show Reports</Text>
            </Pressable>
          </View>
          {/* owner text data con */}
          <View style={styles.cardTextCon}>
            {/* owner username */}
            <Text style={styles.username}>
              {loggedInData?.loggedIn?.username}
            </Text>
            {/* owner commorbidity */}
            <Text style={styles.cardCommorbidity}>
              Commorbidity: {loggedInData?.loggedIn?.commorbidity}
            </Text>
          </View>
        </View>
        {/* fam title */}
        <Text style={styles.title}>Family member</Text>
        {/* fam member */}
        {famMember?.map((member) => {
          return (
            // fam card
            <View style={styles.card} key={member._id}>
              {/* button con */}
              <View style={styles.buttonCon}>
                {/* create report on site */}
                <Pressable
                  onPress={() => {
                    createReport(member._id, "OnSite");
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Book Test On Site</Text>
                </Pressable>
                {/* create report on visit */}
                <Pressable
                  onPress={() => {
                    createReport(member._id, "OnVisit");
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Book Test On Visit</Text>
                </Pressable>
                {/* kick list of reports */}
                <Pressable
                  onPress={() => {
                    navigation.navigate("ReportListOfMember", {
                      ownerId: member._id,
                    });
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Show Reports</Text>
                </Pressable>
              </View>
              {/* fam text data con */}
              <View style={styles.cardTextCon}>
                {/* fam username */}
                <Text style={styles.username}>{member?.username}</Text>
                {/* fam commorbidity */}
                <Text style={styles.cardCommorbidity}>
                  Commorbidity: {member?.commorbidity}
                </Text>
              </View>
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
  title: {
    marginTop: 30,
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
  button: {
    backgroundColor: "#59BB85",
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
  buttonCon: {
    flexDirection: "column",
    gap: 8,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    gap: 16,
  },
  username: {
    fontWeight: "800",
    fontSize: 16,
  },
  cardTextCon: {
    flexDirection: "column",
    justifyContent: "center",
  },
  cardCommorbidity: {
    fontWeight: "500",
    color: "#59BB85",
  },
});
