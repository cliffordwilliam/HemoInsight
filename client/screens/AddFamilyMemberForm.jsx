import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    TextInput,
} from "react-native";
import { ADDFAMILY, LOGGEDINUSER } from "../config/queries";

export default function AddFamilyMemberForm({ navigation }) {
    const [username, setUsername] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [address, setAddress] = useState("");
    const [commorbidity, setCommorbidity] = useState("");
    const [MutateFamMember, { data: AddFamilyResponse }] = useMutation(
        ADDFAMILY,
        {
            onCompleted: async () => {
                console.log(
                    "Home page -> onCompleted MutateADDFAMILY",
                    AddFamilyResponse
                );
                navigation.navigate("FamilyMember");
                await funcLoggedIn();
            },
            refetchQueries: [LOGGEDINUSER],
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
    return (
        <SafeAreaView>
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
