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

export default function ReportListOfMember({ navigation, route }) {
    console.log(route.params.ownerId, `ini`);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>ini reports of each member</Text>
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
