import { LineChart } from "react-native-chart-kit";
import React from "react";
import { Dimensions, Text, View } from "react-native";

const ChartPage = () => {
  const linedata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={linedata}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel={"$"}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ChartPage;
