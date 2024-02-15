import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface PinchGraphProps {
  data: { value: number; label: string }[];
}

const WeekPinchGraph = ({ data }: PinchGraphProps) => {
  return (
    <ScrollView 
    horizontal={true}
    contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <BarChart
          barWidth={22}
          // noOfSections={8}
          barBorderRadius={4}
          frontColor="lightgray"
          data={data}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
    </ScrollView>
  );
};

export default WeekPinchGraph;

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
