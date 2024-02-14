import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import { useUserContext } from "../../../../contexts/UserContext";
import Colors from "../../../../constants/styles";

interface GeneralAnalyticsProps {}

const GeneralAnalytics = (props: GeneralAnalyticsProps) => {
  const user = useUserContext();

  const pinchData: { value: number }[] = [];
  const deadhangData: { value: number }[] = [];
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  const barData = [
    { value: 250, label: "M" },
    { value: 500, label: "T", frontColor: "#177AD5" },
    { value: 745, label: "W", frontColor: "#177AD5" },
    { value: 320, label: "T" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ];

  const stackDataWeeklyActivity = [
    {
      stacks: [
        { value: 1, color: Colors.pinchColor },
        { value: 1, color: Colors.deadhangColor, marginBottom: 2 },
      ],
      label: "M",
    },
    {
      stacks: [
        { value: 1, color: "#4ABFF4" },
        { value: 1, color: "orange", marginBottom: 2 },
        { value: 1, color: "#28B2B3", marginBottom: 2 },
      ],
      label: "T",
    },
    {
      stacks: [
        { value: 1, color: "orange" },
        { value: 1, color: "#4ABFF4", marginBottom: 2 },
      ],
      label: "W",
    },
    {
      stacks: [
        { value: 1, color: "#4ABFF4" },
        { value: 1, color: "orange", marginBottom: 2 },
        { value: 1, color: "#28B2B3", marginBottom: 2 },
      ],
      label: "T",
    },
    {
      stacks: [
        { value: 1, color: "#4ABFF4" },
        { value: 1, color: "orange", marginBottom: 2 },
        { value: 1, color: "#28B2B3", marginBottom: 2 },
      ],
      label: "F",
    },
    {
      stacks: [
        { value: 1, color: "#4ABFF4" },
        { value: 1, color: "orange", marginBottom: 2 },
        { value: 1, color: "#28B2B3", marginBottom: 2 },
      ],
      label: "S",
    },
    {
      stacks: [
        { value: 0, color: "#4ABFF4" },
        { value: 1, color: "orange", marginBottom: 2 },
        { value: 0, color: "#28B2B3", marginBottom: 2 },
      ],
      label: "S",
    },
  ];

  if (user.challengeProgresses) {
    for (const data of Object.values(
      user.challengeProgresses.PinchProgresses
    )) {
      pinchData.push({ value: data.length });
    }
    for (const data of Object.values(
      user.challengeProgresses.DeadhangProgresses
    )) {
      deadhangData.push({ value: data.length });
    }
  }

  console.log("pinchData: ", pinchData);
  console.log("deadhangData: ", deadhangData);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />

      <Text></Text>
      <BarChart
        width={300}
        rotateLabel
        noOfSections={5}
        maxValue={3}
        stackData={stackDataWeeklyActivity}
      />
      <BarChart data={data} />
      <LineChart data={data} />
      <PieChart data={data} />
    </ScrollView>
  );
};

export default GeneralAnalytics;

const styles = StyleSheet.create({
  container: {},
});
