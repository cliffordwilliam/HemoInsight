import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import {
  GETSERVICES,
  ADDFAMILY,
  LOGGEDINUSER,
  CREATEREPORT,
} from "../config/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

export default function Homepage({ navigation }) {
  // store
  const { removeTokenLogin } = useContext(LoginContext);
  // state
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const [commorbidity, setCommorbidity] = useState("");
  // ONREADY get Services Data
  const { data: servicesData, loading: servicesLoading } = useQuery(
    GETSERVICES,
    {
      onCompleted: () => {
        console.log("Home page -> onCompleted QueryGETSERVICES", servicesData);
      },
    }
  );
  // LAZY get loggedin
  const [funcLoggedIn, { data: loggedInData, loading: loggedInLoading }] =
    useLazyQuery(LOGGEDINUSER, {
      onCompleted: () => {
        console.log("Home page -> onCompleted QueryLOGGEDINUSER", loggedInData);
      },
    });
  useEffect(() => {
    funcLoggedIn();
  }, []);
  // press -> Logout
  const handleLogout = async () => {
    console.log("Home page -> logout removeTokenLogin");
    await removeTokenLogin();
  };
  // db talk
  const [MutateFamMember, { data: AddFamilyResponse }] = useMutation(
    ADDFAMILY,
    {
      onCompleted: async () => {
        console.log(
          "Home page -> onCompleted MutateADDFAMILY",
          AddFamilyResponse
        );
        await funcLoggedIn();
      },
      refetchQueries: [LOGGEDINUSER],
    }
  );
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
  // press -> MutateFamMember
  const mutateFamMember = () => {
    MutateFamMember({
      variables: {
        payload: {
          username,
          weight: +weight,
          height: +height,
          birthdate,
          address,
          commorbidity,
        },
      },
    });
    setUsername("");
    setWeight("");
    setHeight("");
    setBirthdate("");
    setAddress("");
    setCommorbidity("");
  };
  // press -> createReport
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

  // render
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.con}>
          {/* LOGGED IN profile card */}
          <View style={styles.profileCard}>
            {loggedInLoading ? (
              <Text>Loading...</Text>
            ) : (
              <>
                <Text>username: {loggedInData?.loggedIn.username}</Text>
                <Text>email: {loggedInData?.loggedIn.email}</Text>
                <Text>birthdate: {loggedInData?.loggedIn.birthdate}</Text>
                <Text>weight: {loggedInData?.loggedIn.weight}</Text>
                <Text>height: {loggedInData?.loggedIn.height}</Text>
                <Text>address: {loggedInData?.loggedIn.address}</Text>
                <Text>status: {loggedInData?.loggedIn.status}</Text>
                <Text>commorbidity: {loggedInData?.loggedIn.commorbidity}</Text>
                {/* createReport buttons */}
                <View style={styles.hflex}>
                  <Pressable
                    onPress={() => {
                      createReport(loggedInData?.loggedIn._id, "OnSite");
                    }}
                  >
                    <Text style={styles.visitButton}>Onsite</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      createReport(loggedInData?.loggedIn._id, "OnVisit");
                    }}
                  >
                    <Text style={styles.visitButton}>OnVisit</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
          {/* Family Member List */}
          <View style={styles.familyMemberForm}>
            <Text>My Family Member</Text>
            {loggedInLoading ? (
              <Text>Loading...</Text>
            ) : (
              <View>
                {loggedInData?.loggedIn?.childs?.map((child) => (
                  <View key={child._id} style={styles.famCon}>
                    <View style={styles.famCard}>
                      <Text>{child?.username}</Text>
                    </View>
                    {/* createReport buttons */}
                    <Pressable
                      style={styles.famVisitButton}
                      onPress={() => {
                        createReport(child._id, "OnSite");
                      }}
                    >
                      <Text>On Site</Text>
                    </Pressable>
                    <Pressable
                      style={styles.famVisitButton}
                      onPress={() => {
                        createReport(child._id, "OnVisit");
                      }}
                    >
                      <Text>On Visit</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>
          {/* add fam form */}
          <View style={styles.addFamForm}>
            {/* title */}
            <Text>Add Family Member</Text>
            {/* username */}
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
            />
            <Text>Biodata</Text>
            {/* birthday */}
            <TextInput
              style={styles.textInput}
              value={birthdate}
              onChangeText={(text) => setBirthdate(text)}
              placeholder="Birth Date"
            />
            {/* weight */}
            <TextInput
              style={styles.textInput}
              value={weight}
              onChangeText={(text) => setWeight(text)}
              placeholder="Weight"
            />
            {/* height */}
            <TextInput
              style={styles.textInput}
              value={height}
              onChangeText={(text) => setHeight(text)}
              placeholder="Height"
            />
            {/* address */}
            <TextInput
              style={styles.textInput}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Address"
            />
            {/* comorbidity */}
            <TextInput
              style={styles.textInput}
              value={commorbidity}
              onChangeText={(text) => setCommorbidity(text)}
              placeholder="Comorbidity"
            />
            {/* submit */}
            <Pressable onPress={mutateFamMember} style={styles.button}>
              <Text>Submit</Text>
            </Pressable>
          </View>
          {/* page button container */}
          <View style={styles.hflex}>
            {/* record */}
            <Pressable style={styles.pageButton}>
              <Text>My Health Record</Text>
            </Pressable>
            {/* appointment */}
            <Pressable style={styles.pageButton}>
              <Text>Create Appointment</Text>
            </Pressable>
            {/* logout */}
            <Pressable style={styles.pageButton} onPress={handleLogout}>
              <Text>Logout</Text>
            </Pressable>
          </View>
        </View>
        {/* services container */}
        <ScrollView>
          <View style={styles.con}>
            {/* service card */}
            {servicesLoading ? (
              <Text>Loading...</Text>
            ) : (
              servicesData.services.map((service) => (
                <View style={styles.serviceCard} key={service._id}>
                  <Text style={styles.serviceCardTitle}>{service.title}</Text>
                  <Text>Clinic: {service.clinic}</Text>
                  <Text style={styles.serviceCardContent}>
                    {service.description}
                  </Text>
                  <Text>Price: Rp{service.price},000</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
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
  famCon: { flexDirection: "row", gap: 4, margin: 1, alignItems: "center" },
  visitButton: {
    width: "auto",
    height: 20,
    backgroundColor: "white",
  },
  famCard: {
    width: 250,
    height: 30,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  famVisitButton: {
    width: "auto",
    height: 30,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: "teal",
    borderRadius: 20,
  },
  addFamForm: {
    width: "100%",
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  familyMemberForm: {
    width: "100%",
    height: 250,
    backgroundColor: "lightblue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  textInput: {
    margin: 5,
    width: 200,
    height: 40,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 8,
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
  hflex: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  pageButton: {
    width: 110,
    height: 110,
    backgroundColor: "lightblue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceCard: {
    width: "100%",
    height: 280,
    borderColor: "lightblue",
    borderWidth: 5,
    borderRadius: 10,
    flexDirection: "column",
    marginVertical: 5,
    padding: 10,
    justifyContent: "space-between",
  },
  serviceCardTitle: { fontWeight: "700", fontSize: 20 },
  serviceCardContent: {
    backgroundColor: "lightgray",
    padding: 9,
    margin: 8,
  },
});
