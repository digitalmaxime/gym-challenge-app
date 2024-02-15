import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface PinchGraphProps {
  data: { value: number; label: string }[];
}

const MonthPinchGraph = ({ data }: PinchGraphProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={{ width: "100%" }}>
          <BarChart
            barWidth={10}
            // noOfSections={8}
            //   spacing={4}
            barBorderRadius={2}
            frontColor="lightgray"
            data={data}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MonthPinchGraph;

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
