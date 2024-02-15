import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface DistributionGraphProps {
  data: { value: number; color: string; text?: string }[];
}

const DistributionGraph = ({ data }: DistributionGraphProps) => {
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        showText
        textColor="black"
        radius={90}
        textSize={16}
        // showTextBackground
        // textBackgroundRadius={26}
      />
    </View>
  );
};

export default DistributionGraph;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
