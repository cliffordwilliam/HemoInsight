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

export default function Result({ navigation, route }) {
    const ReportId = route.params.reportId;
    console.log(ReportId, `ini report ID untuk result`);
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={{ fontSize: 20 }}>
                        Ini adalah result dari form Report ID {ReportId}
                    </Text>
                    <Text>1. Query Report berdasarkan ID.</Text>
                    <Text>2. Olah data , penampilan harus di ubah.</Text>
                    <Text>3.. Update data Report di bagian result.</Text>
                    <Text>4. Provide result reading.</Text>
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
