import { LineChart, StackedBarChart } from "react-native-chart-kit";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GET_REPORT_BY_ID } from "../config/queries";
import { useQuery } from "@apollo/client";

export default function ChartPage({ navigation, route }) {
  const [userData, setUserData] = useState({});
  const [servicesList, setServicesList] = useState([]);
  const { reportId } = route.params;
  // ONREADY get report by its ID
  const { data: Report, loading: ReportLoading } = useQuery(GET_REPORT_BY_ID, {
    variables: {
      reportId: reportId,
    },
    onCompleted: () => {
      setUserData(Report?.report);
      setServicesList(Report?.report?.services);
    },
  });
  // do not go down if got no data yet
  if (ReportLoading) {
    return;
  }
  // STORE build data (to be displayed as bar graph)
  dataObj = {
    "Full Blood Count": [],
    "Blood Glucose Test": [],
    "Long Term Glucose HbA1c Test": [],
    "Prostate Specific Antigen (PSA) Test": [],
    "Iron Studies": [],
    "Vitamin D Test": [],
    "Allergy Testing": [],
    "Electrolyte Panel": [],
    "Kidney Function Tests": [],
    "Liver Function Tests": [],
    "Lipid Panel": [],
    "C-Reactive Protein (CRP) Test": [],
    "HIV Test": [],
    "Rheumatoid Factor Test": [],
    "Pregnancy hCG Test": [],
    "Thyroid Function Tests": [],
    "Coagulation Panel": [],
  };
  // helper to generate a random value within a range
  function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  function getRandomBoolean() {
    return Math.random() < 0.5;
  }

  // data is here -> check each title -> create data -> push to dataObj
  for (let i = 0; i < servicesList.length; i++) {
    const service = servicesList[i];
    const serviceTitle = service.title;
    switch (serviceTitle) {
      case "Full Blood Count":
        // rand 1
        const hemoglobin = getRandomValue(12, 16); // in g/dL
        const whiteBloodCellCount = getRandomValue(4, 11); // in K/uL
        const plateletCount = getRandomValue(150, 400); // in K/uL
        // rand 2
        const cholesterol = getRandomValue(125, 200);
        const triglyceridesBlood = getRandomValue(50, 150);
        const hdlCholesterolBlood = getRandomValue(40, 60);
        const ldlCholesterolBlood = getRandomValue(70, 130);
        // push
        dataObj["Full Blood Count"].push([
          // data 1
          {
            labels: ["Hemoglobin", "WBC Count", "Platelet Count"],
            legend: ["Result"],
            data: [[hemoglobin], [whiteBloodCellCount], [plateletCount]],
            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
          },
          // data 2
          {
            labels: [
              "Cholesterol",
              "Triglycerides",
              "HDL Cholesterol",
              "LDL Cholesterol",
            ],
            legend: ["Result"],
            data: [
              [cholesterol],
              [triglyceridesBlood],
              [hdlCholesterolBlood],
              [ldlCholesterolBlood],
            ],
            barColors: ["#abcdef", "#fedcba", "#badcfe", "#aabbcc"],
          },
        ]);
        break;
      case "Blood Glucose Test":
        // rand 1
        const fastingGlucose = getRandomValue(70, 100); // in mg/dL
        const postprandialGlucose = getRandomValue(70, 130); // in mg/dL
        // rand 2
        const glycatedAlbumin = getRandomValue(10, 18); // in percentage
        // push
        dataObj["Blood Glucose Test"].push([
          // data 1
          {
            labels: [
              "Fasting Glucose",
              "                       Postprandial Glucose",
            ],
            legend: [
              `${fastingGlucose < 100 ? "Normal" : "Prediabetic"}`,
              `${postprandialGlucose < 140 ? "Normal" : "Prediabetic"}`,
            ],
            data: [[fastingGlucose], [postprandialGlucose]],
            barColors: ["#dfe4ea", "#ced6e0"],
          },
          // data 2
          {
            labels: ["Glycated Albumin"],
            legend: [`${glycatedAlbumin < 10 ? "Normal" : "Abnormal"}`],
            data: [[glycatedAlbumin]],
            barColors: ["#abcdef"],
          },
        ]);
        break;
      case "Long Term Glucose HbA1c Test":
        // rand 1
        const hbA1c = getRandomValue(4, 9); // in percentage
        // rand 2
        const fastingBloodSugar = getRandomValue(50, 300); // in mg/dL
        // push
        dataObj["Long Term Glucose HbA1c Test"].push([
          // data 1
          {
            labels: ["HbA1c Level"],
            legend: [
              `${
                hbA1c > 4.0 ? "Normal" : hbA1c > 6 ? "Prediabetic" : "Diabetic"
              }`,
            ],
            data: [[hbA1c]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Fasting Blood Sugar"],
            legend: [
              `${
                fastingBloodSugar > 100
                  ? "Normal"
                  : fastingBloodSugar > 130
                  ? "Prediabetic"
                  : "Diabetic"
              }`,
            ],
            data: [[fastingBloodSugar]],
            barColors: ["#abcdef"],
          },
        ]);
        break;
      case "Prostate Specific Antigen (PSA) Test":
        // rand 1
        const psaLevel = getRandomValue(0.1, 10.0); // in ng/mL (Example range for PSA level)
        // rand 2
        const freePSALevel = getRandomValue(0.1, 3.0); // in ng/mL (Example range for Free PSA level)
        // push
        dataObj["Prostate Specific Antigen (PSA) Test"].push([
          // data 1
          {
            labels: ["PSA Level"],
            legend: [`${psaLevel > 4.0 ? "Abnormal" : "Normal"}`],
            data: [[psaLevel]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Free PSA Level"],
            legend: [`${freePSALevel > 2.5 ? "Abnormal" : "Normal"}`],
            data: [[freePSALevel]],
            barColors: ["#abcdef"],
          },
        ]);
        break;
      case "Iron Studies":
        // rand 1
        const serumIron = getRandomValue(50, 150); // in µg/dL (Example range for Serum Iron)
        // rand 2
        const tibc = getRandomValue(240, 450); // in µg/dL (Example range for Total Iron Binding Capacity)
        // rand 3
        const ferritin = getRandomValue(30, 300); // in ng/mL (Example range for Ferritin)
        // push
        dataObj["Iron Studies"].push([
          // data 1
          {
            labels: ["Serum Iron"],
            legend: ["Result"],
            data: [[serumIron]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Total Iron Binding Capacity (TIBC)"],
            legend: ["Result"],
            data: [[tibc]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["Ferritin"],
            legend: ["Result"],
            data: [[ferritin]],
            barColors: ["#fedcba"],
          },
        ]);
        break;
      case "Vitamin D Test":
        // rand 1
        const vitaminD2 = getRandomValue(10, 50); // in ng/mL (Example range for Vitamin D2)
        // rand 2
        const vitaminD3 = getRandomValue(20, 80); // in ng/mL (Example range for Vitamin D3)
        // push
        dataObj["Vitamin D Test"].push([
          // data 1
          {
            labels: ["Vitamin D2"],
            legend: ["Result"],
            data: [[vitaminD2]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Vitamin D3"],
            legend: ["Result"],
            data: [[vitaminD3]],
            barColors: ["#abcdef"],
          },
        ]);
        break;
      case "Allergy Testing":
        // rand 1
        const pollenAllergy = getRandomValue(0, 100); // Example range for pollen allergy result
        // rand 2
        const dustMiteAllergy = getRandomValue(0, 100); // Example range for dust mite allergy result
        // push
        dataObj["Allergy Testing"].push([
          // data 1
          {
            labels: ["Pollen Allergy"],
            legend: ["Result"],
            data: [[pollenAllergy]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Dust Mite Allergy"],
            legend: ["Result"],
            data: [[dustMiteAllergy]],
            barColors: ["#abcdef"],
          },
        ]);
        break;
      case "Electrolyte Panel":
        // rand 1
        const sodiumLevel = getRandomValue(135, 145); // in mmol/L (Example range for Sodium)
        // rand 2
        const potassiumLevel = getRandomValue(3.5, 5.0); // in mmol/L (Example range for Potassium)
        // rand 3
        const chlorideLevel = getRandomValue(98, 108); // in mmol/L (Example range for Chloride)
        // push
        dataObj["Electrolyte Panel"].push([
          // data 1
          {
            labels: ["Sodium (Na+)"],
            legend: ["Result"],
            data: [[sodiumLevel]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Potassium (K+)"],
            legend: ["Result"],
            data: [[potassiumLevel]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["Chloride (Cl-)"],
            legend: ["Result"],
            data: [[chlorideLevel]],
            barColors: ["#fedcba"],
          },
        ]);
        break;
      case "Kidney Function Tests":
        // rand 1
        const serumCreatinine = getRandomValue(0.6, 1.3); // in mg/dL (Example range for Serum Creatinine)
        // rand 2
        const bunLevel = getRandomValue(7, 20); // in mg/dL (Example range for Blood Urea Nitrogen)
        // rand 3
        const gfrLevel = getRandomValue(90, 120); // in mL/min/1.73m² (Example range for Glomerular Filtration Rate)
        // push
        dataObj["Kidney Function Tests"].push([
          // data 1
          {
            labels: ["Serum Creatinine"],
            legend: ["Result"],
            data: [[serumCreatinine]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Blood Urea Nitrogen (BUN)"],
            legend: ["Result"],
            data: [[bunLevel]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["Glomerular Filtration Rate (GFR)"],
            legend: ["Result"],
            data: [[gfrLevel]],
            barColors: ["#fedcba"],
          },
        ]);
        break;
      case "Liver Function Tests":
        // rand 1
        const altLevel = getRandomValue(7, 56); // in U/L (Example range for ALT)
        // rand 2
        const astLevel = getRandomValue(10, 40); // in U/L (Example range for AST)
        // rand 3
        const alpLevel = getRandomValue(40, 130); // in U/L (Example range for ALP)
        // push
        dataObj["Liver Function Tests"].push([
          // data 1
          {
            labels: ["Alanine Aminotransferase (ALT)"],
            legend: ["Result"],
            data: [[altLevel]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Aspartate Aminotransferase (AST)"],
            legend: ["Result"],
            data: [[astLevel]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["Alkaline Phosphatase (ALP)"],
            legend: ["Result"],
            data: [[alpLevel]],
            barColors: ["#fedcba"],
          },
        ]);
        break;
      case "Lipid Panel":
        // rand 1
        const totalCholesterol = getRandomValue(125, 200); // in mg/dL (Example range for Total Cholesterol)
        // rand 2
        const ldlCholesterol = getRandomValue(50, 130); // in mg/dL (Example range for LDL Cholesterol)
        // rand 3
        const hdlCholesterol = getRandomValue(40, 70); // in mg/dL (Example range for HDL Cholesterol)
        // rand 4
        const triglycerides = getRandomValue(50, 150); // in mg/dL (Example range for Triglycerides)
        // push
        dataObj["Lipid Panel"].push([
          // data 1
          {
            labels: ["Total Cholesterol"],
            legend: ["Result"],
            data: [[totalCholesterol]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["LDL Cholesterol"],
            legend: ["Result"],
            data: [[ldlCholesterol]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["HDL Cholesterol"],
            legend: ["Result"],
            data: [[hdlCholesterol]],
            barColors: ["#fedcba"],
          },
          // data 4
          {
            labels: ["Triglycerides"],
            legend: ["Result"],
            data: [[triglycerides]],
            barColors: ["#987654"],
          },
        ]);
        break;
      case "C-Reactive Protein (CRP) Test":
        // rand
        const crpLevel = getRandomValue(0.3, 20.0); // in mg/L (Example range for CRP)
        // push
        dataObj["C-Reactive Protein (CRP) Test"].push([
          // data
          {
            labels: ["CRP Level"],
            legend: [
              `${
                crpLevel < 0.3
                  ? "Normal"
                  : crpLevel <= 1.0
                  ? "Normal/Minor"
                  : crpLevel <= 10.0
                  ? "Moderate"
                  : crpLevel <= 50.0
                  ? "Elevated"
                  : "Severe"
              }`,
            ],
            data: [[crpLevel]],
            barColors: ["#dfe4ea"],
          },
        ]);
        break;
      case "HIV Test":
        // rand

        const hivResult = getRandomValue(100, 1500);
        // const hivResult = getRandomBoolean(); // Simulate a positive or negative result
        // push
        dataObj["HIV Test"].push([
          // data
          {
            labels: ["HIV Result"],
            legend: [`${hivResult >= 200 ? "Advance HIV" : "Negative"}`],
            data: [[hivResult]],
            barColors: [hivResult ? "#ff0000" : "#00ff00"], // Red for positive, green for negative
          },
        ]);
        break;
      case "Rheumatoid Factor Test":
        // rand
        const rheumatoidFactor = getRandomValue(0, 50); // in IU/mL (Example range for Rheumatoid Factor)
        // push
        dataObj["Rheumatoid Factor Test"].push([
          // data
          {
            labels: ["Rheumatoid Factor"],
            legend: [
              `${
                rheumatoidFactor <= 20
                  ? "Normal"
                  : rheumatoidFactor <= 50
                  ? "Elevated"
                  : "High"
              }`,
            ],
            data: [[rheumatoidFactor]],
            barColors: ["#dfe4ea"],
          },
        ]);
        break;
      case "Pregnancy hCG Test":
        // rand
        const hcgLevel = getRandomValue(5, 500); // in mIU/mL (Example range for hCG level in early pregnancy)
        // push
        dataObj["Pregnancy hCG Test"].push([
          // data
          {
            labels: ["hCG Level"],
            legend: [
              `${
                hcgLevel <= 5
                  ? "Negative"
                  : hcgLevel <= 25
                  ? "grey area"
                  : "Positive"
              }`,
            ],
            data: [[hcgLevel]],
            barColors: ["#dfe4ea"],
          },
        ]);
        break;
      case "Thyroid Function Tests":
        // rand 1
        const tshLevel = getRandomValue(0.5, 5.0); // in mIU/L (Example range for TSH)
        // rand 2
        const ft4Level = getRandomValue(0.8, 2.0); // in ng/dL (Example range for FT4)
        // rand 3
        const ft3Level = getRandomValue(2.0, 4.4); // in pg/mL (Example range for FT3)
        // push
        dataObj["Thyroid Function Tests"].push([
          // data 1
          {
            labels: ["TSH Level"],
            legend: ["Result"],
            data: [[tshLevel]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Free Thyroxine (FT4)"],
            legend: ["Result"],
            data: [[ft4Level]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["Free Triiodothyronine (FT3)"],
            legend: ["Result"],
            data: [[ft3Level]],
            barColors: ["#fedcba"],
          },
        ]);
        break;
      case "Coagulation Panel":
        // rand 1
        const ptLevel = getRandomValue(10, 14); // in seconds (Example range for PT)
        // rand 2
        const apttLevel = getRandomValue(25, 40); // in seconds (Example range for APTT)
        // rand 3
        const inrLevel = getRandomValue(0.8, 1.2); // Example range for INR
        // push
        dataObj["Coagulation Panel"].push([
          // data 1
          {
            labels: ["Prothrombin Time (PT)"],
            legend: ["Result"],
            data: [[ptLevel]],
            barColors: ["#dfe4ea"],
          },
          // data 2
          {
            labels: ["Activated Partial Thromboplastin Time (APTT)"],
            legend: ["Result"],
            data: [[apttLevel]],
            barColors: ["#abcdef"],
          },
          // data 3
          {
            labels: ["International Normalized Ratio (INR)"],
            legend: ["Result"],
            data: [[inrLevel]],
            barColors: ["#fedcba"],
          },
        ]);
        break;
    }
  }
  // render
  return (
    <ScrollView>
      <View style={styles.con}>
        {/* render test results */}
        {Object.entries(dataObj).map(([testName, testData]) => {
          if (testData.length > 0) {
            return (
              <View style={styles.card} key={testName}>
                {/* test title */}
                <Text style={styles.title}>{testName}</Text>
                {/* sub tests */}
                {testData.map((data, index) => (
                  <View style={styles.chartCon} key={index}>
                    {data.map((chartData, chartIndex) => (
                      <StackedBarChart
                        key={chartIndex}
                        data={{
                          labels: chartData.labels,
                          legend: chartData.legend,
                          data: chartData.data,
                          barColors: chartData.barColors,
                        }}
                        width={Dimensions.get("window").width - 50}
                        height={300}
                        withHorizontalLabels={true}
                        chartConfig={{
                          backgroundColor: "#e26a00",
                          backgroundGradientFrom: "#fb8c00",
                          backgroundGradientTo: "#ffa726",
                          decimalPlaces: 2,
                          color: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                          style: {
                            borderRadius: 16,
                          },
                        }}
                      />
                    ))}
                  </View>
                ))}
              </View>
            );
          }
          return null;
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
  card: {
    padding: 16,
    borderRadius: 8,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 16,
  },
  chartCon: {
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
  },
});
