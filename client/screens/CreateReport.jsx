import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { CREATEREPORT } from "../config/queries";
import { GETSERVICES, SERVICETITLEDESC } from "../config/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useState } from "react";
export default function CreateReport({ navigation }) {
  // TODO: DO NOT USE FORM, USE CARDS, EACH USER / CHILD CARD HAS A CREATE FORM BUTTON, AND AN OPTION FOR ONSITE OR ONVISIT
  const [servicesData, setServicesData] = useState([]);
  const [title, setTitle] = useState("");
  // get Services Data
  const { data: Services } = useQuery(GETSERVICES, {
    onCompleted: () => {
      console.log(`success retrieving data`);
      setServicesData(Services.services);
    },
  });
  // get Services data search (on press button)
  const [getServices, { data, loading, error }] = useLazyQuery(
    SERVICETITLEDESC,
    {
      onCompleted: (res) => {
        console.log("CreateReport page -> onCompleted SERVICETITLEDESC", res);
        setServicesData(res.serviceTitleDescription);
      },
    }
  );
  // press -> QUERYSERVICETITLEDESC
  const searchServices = () => {
    console.log(title);
    getServices({
      variables: {
        title: title,
      },
    });
  };
  // render
  return (
    <SafeAreaView>
      <ScrollView>
        {/* list loggedin User + Childs */}
        
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
          <TouchableOpacity style={styles.button} onPress={searchServices}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
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
                    console.log(service._id);
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
  textInput: {
    margin: 5,
    width: 200,
    height: 40,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 8,
  },
  con: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
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
  hflex: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  formTitle: {
    fontSize: 30,
  },
});
