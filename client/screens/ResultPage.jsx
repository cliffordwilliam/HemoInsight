import { LineChart, StackedBarChart } from "react-native-chart-kit";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GET_REPORT_BY_ID } from "../config/queries";
import { useQuery } from "@apollo/client";
const ChartPage = ({ navigation, route }) => {
    const [userData, setUserData] = useState({});
    const [servicesList, setServicesList] = useState([]);
    const { reportId } = route.params;

    const { data: Report } = useQuery(GET_REPORT_BY_ID, {
        variables: {
            reportId: reportId,
        },
        onCompleted: () => {
            // console.log(`successFetchingReport---->`, Report.report);
            // console.log(`Services---->`, Report.report.services);
            setUserData(Report?.report);
            setServicesList(Report?.report?.services);
        },
    });
    const redBloodCell = {
        datasets: [
            {
                data: [4.0, 4.5, 5.0, 5.5],
                strokeWidth: 5, // optional
            },
        ],
        legend: ["Red Blood Cell"],
    };
    const tgResult = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [231, 300, 100],
                strokeWidth: 5, // optional
            },
        ],
    };
    const services = [redBloodCell, tgResult];

    return (
        <View>
            <ScrollView>
                <View
                    style={{
                        width: "98%",
                        backgroundColor: "orange",
                        height: 120,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 10,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            padding: 5,
                            fontSize: 25,
                        }}
                    >
                        Report Result
                    </Text>
                    <Text
                        style={{
                            color: "white",
                            fontStyle: "italic",
                            padding: 5,
                            fontSize: 28,
                            fontWeight: "bold",
                        }}
                    >
                        {/* Clinic {userData?.services[0].clinic} */}
                    </Text>
                </View>
                <Text
                    style={{
                        color: "gray",
                        fontStyle: "italic",
                        alignSelf: "center",
                        paddingVertical: 5,
                    }}
                >
                    Powered by Hemo Insight Inc
                </Text>
                <View
                    style={{
                        width: "96%",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 18,
                    }}
                >
                    <Text style={style.biodata}>
                        Full Name: {userData.childOwner?.username}
                    </Text>
                    <Text style={style.biodata}>
                        BirthDate: {userData.childOwner?.birthdate}
                    </Text>
                    <Text style={style.biodata}>
                        Weight: {userData.childOwner?.weight} Kg
                    </Text>
                    <Text style={style.biodata}>
                        Height: {userData.childOwner?.height}Cm
                    </Text>
                    <Text style={style.biodata}>
                        Created At: {userData.createdAt}
                    </Text>
                    <Text style={style.biodata}>
                        Patient Comorbidity:{" "}
                        {userData?.childOwner?.commorbidity}
                    </Text>
                    <Text style={style.biodata}>
                        Appointment Type: {userData?.appointment}
                    </Text>
                </View>
                {/* <Text>Amount of services{userData.services.length}</Text> */}
                {servicesList.map((service, index) => (
                    <View
                        style={{
                            marginTop: 30,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>
                            {index + 1}
                            {"."}
                            {service.title} Result
                        </Text>
                    </View>
                ))}
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        left: 10,
                    }}
                >
                    {/* {services.map((service) => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 9,
                            }}
                        >
                            <LineChart
                                data={service}
                                width={Dimensions.get("window").width - 100} // from react-native
                                height={220}
                                yAxisLabel={"$"}
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) =>
                                        `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 20,
                                }}
                            />
                            <View
                                style={{
                                    width: 60,
                                    backgroundColor: "orange",
                                    height: 50,
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text>Good</Text>
                            </View>
                        </View>
                    ))} */}
                </View>
                {/* {Full blood count} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Red Blood Cell</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range (g/dL)", "Result"],
                            legend: ["L1", "L2", "L3"],
                            data: [[4.0, 4.5, 5.5], [5.5]],
                            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {Hemoglobin} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Hemoglobin</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range (%)", "Result"],
                            legend: ["L1", "L2"],
                            data: [[35, 47], [40.2]],
                            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {Eritrosit} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Eritrosit</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(10^6/uL)  ", "Result"],
                            legend: ["L1", "L2"],
                            data: [[3.8, 5.2], [4.4]],
                            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {Trombosit} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Trombosit</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(10^3/uL)  ", "Result"],
                            legend: ["L1", "L2"],
                            data: [[150, 440], [300]],
                            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {Leukosit} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Leukosit</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(10^3/uL)  ", "Result"],
                            legend: ["L1", "L2"],
                            data: [[3.6, 11], [3.8]],
                            barColors: ["#a4b0be", "#008000"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {LED} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>LED</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(mm/hour)  ", "Result"],
                            legend: ["L1", "L2"],
                            data: [[20], [8]],
                            barColors: ["#008000", "#ced6e0", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {Neutrofil} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Neutrofil</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(mm/hour)  ", "Result"],
                            legend: ["50-70 Normal"],
                            data: [[50, 70], [37]],
                            barColors: ["#dfe4ea", "#008000", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* {Vitamin D Test} */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Vitamin D Test</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(ng/mL)  ", "Result"],
                            legend: [
                                "Deficiency",
                                "Insufficiency",
                                "Sufficiency",
                            ],
                            data: [[20, 30, 100], [37]],
                            barColors: ["#dfe4ea", "#008000", "#a4b0be"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* Total Cholesterol:

                {/* Low-Density Lipoprotein (LDL) Cholesterol: */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>
                        Low-Density Lipoprotein (LDL) Cholesterol
                    </Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(mg/dL)", "Result"],
                            legend: [
                                "Optimal Range",
                                "Near Optimal/Above Optimal Range",
                                "Borderline High Range",
                                "High Range",
                                "Very High Range",
                            ],
                            data: [[100, 129, 159, 189], [320]],
                            barColors: [
                                "#008000",
                                "#008000",
                                "#FF0000",
                                "#FF0000",
                            ],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* High-Density Lipoprotein (HDL) Cholesterol: */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>
                        High-Density Lipoprotein (HDL) Cholesterol
                    </Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(mg/dL)", "Result"],
                            legend: [
                                "Low Range (Undesirable)",
                                "Desirable Range",
                            ],
                            data: [[40, 41], [50]],
                            barColors: ["#FF0000", "#008000"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
                {/* Triglycerides: Normal Range: Less than 150 mg/dL */}
                {/*Triglycerides */}
                <View style={{ alignItems: "center", margin: 30 }}>
                    <Text style={{ fontWeight: "700" }}>Triglycerides</Text>
                    <StackedBarChart
                        style={{
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        data={{
                            labels: ["Normal Range(mg/dL)", "Result"],
                            legend: ["Normal Range", "Undesirable Range"],
                            data: [[150, 300], [75]],
                            barColors: ["#008000", "#FF0000"],
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={250}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default ChartPage;

const style = StyleSheet.create({
    biodata: { fontSize: 18, fontWeight: "300", margin: 2 },
});
