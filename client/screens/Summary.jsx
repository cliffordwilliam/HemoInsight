import { LineChart, StackedBarChart } from "react-native-chart-kit";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GET_REPORT_BY_OWNERID } from "../config/queries";
import { useQuery } from "@apollo/client";

export default function Summary({ navigation, route }) {
  // params
  const { ownerId } = route.params;
  // ONREADY report
  const { data: ReportData, loading: ReportLoading } = useQuery(
    GET_REPORT_BY_OWNERID,
    {
      variables: {
        ownerId,
      },
      onCompleted: () => {
        console.log(
          "Summary page -> onCompleted QueryLOGGEDINUSER",
          ReportData
        );
      },
      refetchQueries: [GET_REPORT_BY_OWNERID],
      fetchPolicy: "network-only",
    }
  );
  // do not render if data not here yet
  if (ReportLoading) {
    return;
  }
  // report is here
  const reports = ReportData.reportsByOwnerId;
  // remove unpaid
  const paidReports = reports.filter((report) => report.status === "paid");
  // collect services of same kind (type: [services])
  const servicesByType = {};
  paidReports.forEach((report) => {
    report.services.forEach((service) => {
      const serviceTitle = service.title;
      // 1st encounter? new []
      if (!servicesByType[serviceTitle]) {
        servicesByType[serviceTitle] = [];
      }
      // subsequents? push
      servicesByType[serviceTitle].push(service);
    });
  });
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
  // use servicesByType, check each key, create data, push to dataObj as long as services in it
  // 1 type, report collection, of 1 axis, x -> y axis. x axis -> reports
  function cook(type, amount) {
    // report axis
    let x = [];
    for (let i = 0; i < amount; i++) {
      x.push(`Report ${i + 1}`);
    }
    // color
    const barColors = Array.from(
      { length: amount },
      (_, index) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
    switch (type) {
      case "Full Blood Count":
        // rand
        let hemoglobin = [];
        let whiteBloodCellCount = [];
        let plateletCount = [];
        let cholesterol = [];
        let triglyceridesBlood = [];
        let hdlCholesterolBlood = [];
        let ldlCholesterolBlood = [];
        for (let i = 0; i < amount; i++) {
          hemoglobin.push([getRandomValue(12, 16)]);
          whiteBloodCellCount.push([getRandomValue(4, 11)]);
          plateletCount.push([getRandomValue(150, 400)]);
          cholesterol.push([getRandomValue(125, 200)]);
          triglyceridesBlood.push([getRandomValue(50, 150)]);
          hdlCholesterolBlood.push([getRandomValue(40, 60)]);
          ldlCholesterolBlood.push([getRandomValue(70, 130)]);
        }
        // push
        dataObj["Full Blood Count"].push([
          // TOTAL: , , ,
          // Hemoglobin
          {
            labels: x,
            legend: ["Hemoglobin"],
            data: hemoglobin,
            barColors: barColors,
          },
          // WBC Count
          {
            labels: x,
            legend: ["WBC Count"],
            data: whiteBloodCellCount,
            barColors: barColors,
          },
          // Platelet Count
          {
            labels: x,
            legend: ["Platelet Count"],
            data: plateletCount,
            barColors: barColors,
          },
          // Cholesterol
          {
            labels: x,
            legend: ["Cholesterol"],
            data: cholesterol,
            barColors: barColors,
          },
          // Triglycerides
          {
            labels: x,
            legend: ["Triglycerides"],
            data: triglycerides,
            barColors: barColors,
          },
          // HDL Cholesterol
          {
            labels: x,
            legend: ["HDL Cholesterol"],
            data: hdlCholesterol,
            barColors: barColors,
          },
          // LDL Cholesterol
          {
            labels: x,
            legend: ["LDL Cholesterol"],
            data: ldlCholesterol,
            barColors: barColors,
          },
        ]);
        break;
      case "Blood Glucose Test":
        // rand
        let fastingGlucose = [];
        let postprandialGlucose = [];
        let glycatedAlbumin = [];
        for (let i = 0; i < amount; i++) {
          fastingGlucose.push([getRandomValue(70, 100)]);
          postprandialGlucose.push([getRandomValue(70, 140)]);
          glycatedAlbumin.push([getRandomValue(10, 18)]);
        }
        // push
        dataObj["Blood Glucose Test"].push([
          // TOTAL: , ,
          // Fasting Glucose
          {
            labels: x,
            legend: ["Fasting Glucose"],
            data: fastingGlucose,
            barColors: barColors,
          },
          // Postprandial Glucose
          {
            labels: x,
            legend: ["Postprandial Glucose"],
            data: postprandialGlucose,
            barColors: barColors,
          },
          // Glycated
          {
            labels: x,
            legend: ["Glycated"],
            data: glycatedAlbumin,
            barColors: barColors,
          },
        ]);
        break;
      case "Long Term Glucose HbA1c Test":
        // rand
        let hbA1c = [];
        let fastingBloodSugar = [];
        for (let i = 0; i < amount; i++) {
          hbA1c.push([getRandomValue(4, 6)]);
          fastingBloodSugar.push([getRandomValue(70, 100)]);
        }
        // push
        dataObj["Long Term Glucose HbA1c Test"].push([
          // TOTAL: ,
          // HbA1c Level
          {
            labels: x,
            legend: ["HbA1c Level"],
            data: [hbA1c],
            barColors: barColors,
          },
          // Fasting Blood Sugar
          {
            labels: x,
            legend: ["Fasting Blood Sugar"],
            data: [fastingBloodSugar],
            barColors: barColors,
          },
        ]);
        break;
      case "Prostate Specific Antigen (PSA) Test":
        // rand
        let psaLevel = [];
        let freePSALevel = [];
        for (let i = 0; i < amount; i++) {
          psaLevel.push([getRandomValue(0.1, 4.0)]);
          freePSALevel.push([getRandomValue(0.1, 1.0)]);
        }
        // push
        dataObj["Prostate Specific Antigen (PSA) Test"].push([
          // TOTAL: ,
          // PSA Level
          {
            labels: x,
            legend: ["PSA Level"],
            data: psaLevel,
            barColors: barColors,
          },
          // Free PSA Level
          {
            labels: x,
            legend: ["Free PSA Level"],
            data: freePSALevel,
            barColors: barColors,
          },
        ]);
        break;
      case "Iron Studies":
        // rand
        let serumIron = [];
        let tibc = [];
        let ferritin = [];
        for (let i = 0; i < amount; i++) {
          serumIron.push([getRandomValue(50, 150)]);
          tibc.push([getRandomValue(240, 450)]);
          ferritin.push([getRandomValue(30, 300)]);
        }
        // push
        dataObj["Iron Studies"].push([
          // TOTAL: , ,
          // Serum Iron
          {
            labels: x,
            legend: ["Serum Iron"],
            data: serumIron,
            barColors: barColors,
          },
          // data 2
          {
            labels: x,
            legend: ["Total Iron Binding Capacity (TIBC)"],
            data: tibc,
            barColors: barColors,
          },
          // data 3
          {
            labels: x,
            legend: ["Ferritin"],
            data: ferritin,
            barColors: barColors,
          },
        ]);
        break;
      case "Vitamin D Test":
        // rand
        let vitaminD2 = [];
        let vitaminD3 = [];
        for (let i = 0; i < amount; i++) {
          vitaminD2.push([getRandomValue(10, 50)]);
          vitaminD3.push([getRandomValue(20, 80)]);
        }
        // push
        dataObj["Vitamin D Test"].push([
          // TOTAL: Vitamin D2, Vitamin D3
          // Vitamin D2
          {
            labels: x,
            legend: ["Vitamin D2"],
            data: vitaminD2,
            barColors: barColors,
          },
          // Vitamin D3
          {
            labels: x,
            legend: ["Vitamin D3"],
            data: vitaminD3,
            barColors: barColors,
          },
        ]);
        break;
      case "Allergy Testing":
        // rand
        let pollenAllergy = [];
        let dustMiteAllergy = [];
        for (let i = 0; i < amount; i++) {
          pollenAllergy.push([getRandomValue(0, 100)]);
          dustMiteAllergy.push([getRandomValue(0, 100)]);
        }
        // push
        dataObj["Allergy Testing"].push([
          // TOTAL: Pollen Allergy, Dust Mite Allergy
          // Pollen Allergy
          {
            labels: x,
            legend: ["Pollen Allergy"],
            data: pollenAllergy,
            barColors: barColors,
          },
          // Dust Mite Allergy
          {
            labels: x,
            legend: ["Dust Mite Allergy"],
            data: dustMiteAllergy,
            barColors: barColors,
          },
        ]);
        break;
      case "Electrolyte Panel":
        // rand
        let sodiumLevel = [];
        let potassiumLevel = [];
        let chlorideLevel = [];
        for (let i = 0; i < amount; i++) {
          sodiumLevel.push([getRandomValue(135, 145)]);
          potassiumLevel.push([getRandomValue(3.5, 5.0)]);
          chlorideLevel.push([getRandomValue(98, 108)]);
        }
        // push
        dataObj["Electrolyte Panel"].push([
          // TOTAL: Sodium (Na+), Potassium (K+), Chloride (Cl-)
          // Sodium (Na+)
          {
            labels: x,
            legend: ["Sodium (Na+)"],
            data: sodiumLevel,
            barColors: barColors,
          },
          // Potassium (K+)
          {
            labels: x,
            legend: ["Potassium (K+)"],
            data: potassiumLevel,
            barColors: barColors,
          },
          // Chloride (Cl-)
          {
            labels: x,
            legend: ["Chloride (Cl-)"],
            data: chlorideLevel,
            barColors: barColors,
          },
        ]);
        break;
      case "Kidney Function Tests":
        // rand
        let serumCreatinine = [];
        let bunLevel = [];
        let gfrLevel = [];
        for (let i = 0; i < amount; i++) {
          serumCreatinine.push([getRandomValue(0.6, 1.3)]);
          bunLevel.push([getRandomValue(7, 20)]);
          gfrLevel.push([getRandomValue(90, 120)]);
        }
        // push
        dataObj["Kidney Function Tests"].push([
          {
            labels: x,
            legend: ["Serum Creatinine"],
            data: serumCreatinine,
            barColors: barColors,
          },
          {
            labels: x,
            legend: ["Blood Urea Nitrogen (BUN)"],
            data: bunLevel,
            barColors: barColors,
          },
          {
            labels: x,
            legend: ["Glomerular Filtration Rate (GFR)"],
            data: gfrLevel,
            barColors: barColors,
          },
        ]);
        break;
      case "Liver Function Tests":
        // rand
        let altLevel = [];
        let astLevel = [];
        let alpLevel = [];
        for (let i = 0; i < amount; i++) {
          altLevel.push([getRandomValue(7, 56)]);
          astLevel.push([getRandomValue(10, 40)]);
          alpLevel.push([getRandomValue(40, 130)]);
        }
        // push
        dataObj["Liver Function Tests"].push([
          // data 1
          {
            labels: x,
            legend: ["Alanine Aminotransferase (ALT)"],
            data: altLevel,
            barColors: barColors,
          },
          // data 2
          {
            labels: x,
            legend: ["Alanine Aminotransferase (AST)"],
            data: astLevel,
            barColors: barColors,
          },
          // data 3
          {
            labels: x,
            legend: ["Alanine Aminotransferase (ALP)"],
            data: alpLevel,
            barColors: barColors,
          },
        ]);
        break;
      case "Lipid Panel":
        // rand
        let totalCholesterol = [];
        let ldlCholesterol = [];
        let hdlCholesterol = [];
        let triglycerides = [];
        for (let i = 0; i < amount; i++) {
          totalCholesterol.push([getRandomValue(125, 200)]);
          ldlCholesterol.push([getRandomValue(50, 130)]);
          hdlCholesterol.push([getRandomValue(40, 70)]);
          triglycerides.push([getRandomValue(50, 150)]);
        }
        // push
        dataObj["Lipid Panel"].push([
          // data 1
          {
            labels: x,
            legend: ["Total Cholesterol"],
            data: totalCholesterol,
            barColors: barColors,
          },
          // data 2
          {
            labels: x,
            legend: ["LDL Cholesterol"],
            data: ldlCholesterol,
            barColors: barColors,
          },
          // data 3
          {
            labels: x,
            legend: ["HDL Cholesterol"],
            data: hdlCholesterol,
            barColors: barColors,
          },
          // data 4
          {
            labels: x,
            legend: ["Triglycerides"],
            data: triglycerides,
            barColors: barColors,
          },
        ]);
        break;
      case "C-Reactive Protein (CRP) Test":
        // rand
        let crpLevel = [];
        for (let i = 0; i < amount; i++) {
          crpLevel.push([getRandomValue(0.1, 10.0)]);
        }
        // push
        dataObj["C-Reactive Protein (CRP) Test"].push([
          // data
          {
            labels: x,
            legend: ["CRP Level"],
            data: crpLevel,
            barColors: barColors,
          },
        ]);
        break;
      case "HIV Test":
        // rand
        let hivResult = [];
        for (let i = 0; i < amount; i++) {
          hivResult.push([getRandomValue(100, 1500)]);
        }
        // push
        dataObj["HIV Test"].push([
          // data
          {
            labels: x,
            legend: ["HIV Result"],
            data: hivResult,
            barColors: barColors,
          },
        ]);
        break;
      case "Rheumatoid Factor Test":
        // rand
        let rheumatoidFactor = [];
        for (let i = 0; i < amount; i++) {
          rheumatoidFactor.push([getRandomValue(0, 30)]);
        }
        // push
        dataObj["Rheumatoid Factor Test"].push([
          // data
          {
            labels: x,
            legend: ["Rheumatoid Factor"],
            data: rheumatoidFactor,
            barColors: barColors,
          },
        ]);
        break;
      case "Pregnancy hCG Test":
        // rand
        let hcgLevel = [];
        for (let i = 0; i < amount; i++) {
          hcgLevel.push([getRandomValue(5, 500)]);
        }
        // push
        dataObj["Pregnancy hCG Test"].push([
          // data
          {
            labels: x,
            legend: ["hCG Level"],
            data: hcgLevel,
            barColors: barColors,
          },
        ]);
        break;
      case "Thyroid Function Tests":
        // rand
        let tshLevel = [];
        let ft4Level = [];
        let ft3Level = [];
        for (let i = 0; i < amount; i++) {
          tshLevel.push([getRandomValue(0.5, 5.0)]);
          ft4Level.push([getRandomValue(0.8, 2.0)]);
          ft3Level.push([getRandomValue(2.0, 4.4)]);
        }
        // push
        dataObj["Thyroid Function Tests"].push([
          // data 1
          {
            labels: x,
            legend: ["TSH Level"],
            data: tshLevel,
            barColors: barColors,
          },
          // data 2
          {
            labels: x,
            legend: ["Free Thyroxine (FT4)"],
            data: ft4Level,
            barColors: barColors,
          },
          // data 3
          {
            labels: x,
            legend: ["Free Triiodothyronine (FT3)"],
            data: ft3Level,
            barColors: barColors,
          },
        ]);
        break;
      case "Coagulation Panel":
        // rand
        let ptLevel = [];
        let apttLevel = [];
        let inrLevel = [];
        for (let i = 0; i < amount; i++) {
          ptLevel.push([getRandomValue(10, 14)]);
          apttLevel.push([getRandomValue(25, 40)]);
          inrLevel.push([getRandomValue(0.8, 1.2)]);
        }
        // push
        dataObj["Coagulation Panel"].push([
          // data 1
          {
            labels: x,
            legend: ["Prothrombin Time (PT)"],
            data: ptLevel,
            barColors: barColors,
          },
          // data 2
          {
            labels: x,
            legend: ["Activated Partial Thromboplastin Time (APTT)"],
            data: apttLevel,
            barColors: barColors,
          },
          // data 3
          {
            labels: x,
            legend: ["International Normalized Ratio (INR)"],
            data: inrLevel,
            barColors: barColors,
          },
        ]);
        break;
    }
  }
  // make dataObj
  for (const [key, values] of Object.entries(servicesByType)) {
    cook(key, values.length);
  }
  // ready
  return (
    <ScrollView>
      <View style={styles.con}>
        {/* render test results */}
        {reports.length === 0 ? (
          <Text>You have no reports yet.</Text>
        ) : (
          Object.entries(dataObj).map(([testName, testData]) => {
            if (testData.length > 0) {
              return (
                <View style={styles.card} key={testName}>
                  {/* test title */}
                  <Text style={styles.title}>{testName}</Text>
                  {/* sub tests */}

                  {testData.map((data, index) => (
                    <View style={styles.chartCon} key={index}>
                      {data.map((chartData, chartIndex) => (
                        <View>
                          <Text>{chartData.legend}</Text>
                          <StackedBarChart
                            key={chartIndex}
                            data={{
                              labels: chartData.labels,
                              // legend: chartData.legend,
                              data: chartData.data,
                              barColors: chartData.barColors,
                            }}
                            width={Dimensions.get("window").width - 80}
                            height={250}
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
                                padding: 70,
                              },
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })
        )}
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
