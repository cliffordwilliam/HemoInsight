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
import { useQuery } from "@apollo/client";
import { useState } from "react";
export default function MyHealthRecord({ navigation, route }) {
  const [userData, setUserData] = useState({});
  const [familyMember, setFamilyMember] = useState([]);
  const [choosenMember, setChoosenMember] = useState("");
  const [servicesHistory, setServiceHistory] = useState([]);
  console.log(familyMember, `ini `);
  //get user's info
  const { data: logged } = useQuery(LOGGEDINUSER, {
    onCompleted: () => {
      setUserData(logged.loggedIn);
      setFamilyMember(logged.loggedIn.childs);
    },
    fetchPolicy: "network-only",
  });

  //get list of family member
  //when pressed

  //get all report by owner
  const {
    data: reportsData,
    client: ReportsClient,
    loading: dataLoading,
  } = useQuery(GET_REPORT_BY_OWNERID, {
    variables: {
      ownerId: choosenMember,
    },
    onCompleted: () => {
      console.log(
        "ReportListOfMember -> onCompleted QueryGET_REPORT_BY_OWNERID>>>>>>>>>>>>",
        reportsData.reportsByOwnerId.length
      );
    },
  });

  //get paid status report only
  const validReport = [];
  const services = [];
  reportsData?.reportsByOwnerId?.map((report) => {
    if (report.status == "paid") {
      validReport.push(report);
      services.push(report.services);
    }
  });

  console.log(validReport.length, `ini report <<<< `);
  console.log(services.length, `ini <<<<<< services hahahah `);

  // if report.length > 1
  // churn out data

  //  churn out data steps
  // sort the report by the oldest - done

  //get all the services. - done

  //collect or find  all the services that is similar.

  //if the services count is only one, do not churn

  // if serivices of the same kind exists more than one, churn data.

  // get the result by math random, display @ line graph.
  let out = [];
  const generateResult = (testName) => {
    switch (testName) {
      case "Full Blood Count":
        // bkin hasil
        const valueForKey1 = Math.random() * 50;
        res = {
          1: valueForKey1, // angka
          2: Math.random(), // angka
          3: valueForKey1 >= 0 && valueForKey1 <= 35 ? "normal" : "abnormal",
        };
        out.push(res);
        break;
      case "Blood Glucose Test":
        break;
      case 3:
        range = "Long Term Glucose HbA1c Test";
        break;
      case 4:
        range = "Prostate Specific Antigen (PSA) Test";
        break;
      case 5:
        range = "Iron Studies";
        break;
      case 6:
        range = "Vitamin D Test";
        break;
      case 7:
        range = "Allergy Testin";
        break;
      case 8:
        range = "Kidney Function Tests";
        break;
      case 9:
        range = "Rheumatoid Factor Test";
        break;
      default:
        range = "Electrolyte Panel";
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>My Health Records testing </Text>
          {/* <Text>{services[0][1].clinic}</Text> */}
          {/* <Text>{JSON.stringify(services[0][1], null, 2)}</Text> */}
          <Text></Text>
          <Text></Text>

          {services.map((servicePerReport, index) => {
            return servicePerReport.map((service) => {
              return (
                <>
                  <Text style={{ marginTop: 10 }}>
                    {index}
                    {service.title}
                  </Text>

                  <Text style={{ marginBottom: 10 }}>Result</Text>
                </>
              );
            });
          })}
          <Pressable
            onPress={() => {
              setChoosenMember(userData._id);
            }}
          >
            <Text
              style={{
                width: 120,
                backgroundColor: "gray",
                height: 50,
                margin: 5,
              }}
            >
              {userData.username}
            </Text>
          </Pressable>

          {familyMember.map((member, index) => {
            return (
              <Pressable
                onPress={() => {
                  setChoosenMember(member._id);
                }}
              >
                <Text
                  style={{
                    width: 120,
                    backgroundColor: "gray",
                    height: 50,
                    margin: 5,
                  }}
                >
                  {member.username}
                </Text>
              </Pressable>
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
    backgroundColor: "#fff",
  },
  logo: {
    position: "absolute",
    left: 14,
    top: 14,
    fontFamily: "AvenirNext-DemiBold",
    fontSize: 34,
    fontWeight: "bold",
    color: "#3b5998",
  },
  icon: {
    left: 320,
    top: 14,
    width: 36,
    height: 36,
    borderRadius: "50",
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },

  iconPosition: {
    flexDirection: "row",
  },
  headingContainer: {
    marginTop: 21,
    padding: 10,
    top: 3,
    flexDirection: "row",
    gap: 21,
    alignItems: "center",
    marginLeft: 10,
  },
  PostCardUser: {
    top: 3,
    flexDirection: "row",
    gap: 21,
    alignItems: "center",
    marginLeft: 10,
  },

  writePost: {
    fontFamily: "AvenirNext-DemiBold",
    fontSize: 17,
  },
  imageProfile: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  separator: {
    height: 8,
    marginVertical: 12,
    backgroundColor: "lightgray",
  },
  secondarySeperator: {
    height: 1,
    backgroundColor: "lightgray",
  },
  postSeperator: {
    height: 9,
    backgroundColor: "lightgray",
    marginBottom: 13,
  },

  imagePostHeader: {
    width: 43,
    height: 43,
    borderRadius: 20,
    position: "absolute",
    left: 20,
  },
  postContainer: {
    backgroundColor: "gray",
  },
  postHeader: {
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 10,
    fontFamily: "AvenirNext-DemiBold",
    justifyContent: "center",
  },
  usernamePostHeader: {
    marginLeft: 200,
  },
  footerContainer: {
    height: 47,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  footerSubTitle: {
    fontSize: 10,
  },
});
