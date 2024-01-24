import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { LOGGEDINUSER, GET_REPORT_BY_OWNERID } from "../config/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function MyHealthRecord({ navigation, route }) {
  // state
  const [famMember, setFamMember] = useState([]);
  // LAZY query loggedin
  const [funcLoggedIn, { data: loggedInData, loading: loggedInLoading }] =
    useLazyQuery(LOGGEDINUSER, {
      onCompleted: () => {
        console.log("Home page -> onCompleted QueryLOGGEDINUSER", loggedInData);
        setFamMember(loggedInData?.loggedIn?.childs);
      },
      refetchQueries: [LOGGEDINUSER],
      fetchPolicy: "network-only",
    });
  // ONREADY + on navigate here -> LAZY query loggedin
  useEffect(() => {
    funcLoggedIn();
  }, [route]);
  // do not render if data not here yet
  if (loggedInLoading) {
    return;
  }
  // const famMember = loggedInData?.loggedIn?.childs;
  return (
    <ScrollView>
      <View style={styles.con}>
        {/* user title */}
        <Text style={styles.title}>User</Text>
        {/* owner card */}
        <View style={styles.card}>
          {/* button con */}
          <View style={styles.buttonCon}>
            {/* kick list of reports */}
            <Pressable
              onPress={() => {
                navigation.navigate("Summary", {
                  ownerId: loggedInData?.loggedIn?._id,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>See Summary</Text>
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
              Comorbidity: {loggedInData?.loggedIn?.commorbidity}
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
                {/* kick list of reports + fam ID */}
                <Pressable
                  onPress={() => {
                    navigation.navigate("Summary", {
                      ownerId: member._id,
                    });
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>See Summary</Text>
                </Pressable>
              </View>
              {/* fam text data con */}
              <View style={styles.cardTextCon}>
                {/* fam username */}
                <Text style={styles.username}>{member?.username}</Text>
                {/* fam commorbidity */}
                <Text style={styles.cardCommorbidity}>
                  Comorbidity: {member?.commorbidity}
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
  con: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "700",
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
