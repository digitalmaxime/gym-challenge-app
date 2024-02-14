import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

interface PinchGraphProps {
    weekBarData: { value: number; label: string }[];
}

const PinchGraph = ({weekBarData}: PinchGraphProps) => {
  return (
    <View style={styles.container}>
      <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
          <Text>Past week's progress</Text>
          <BarChart
            barWidth={22}
            noOfSections={8}
            barBorderRadius={4}
            frontColor="lightgray"
            data={weekBarData}
            yAxisThickness={0}
            xAxisThickness={0}
          />
    </View>
  );
};

export default PinchGraph;

const styles = StyleSheet.create({
  container: {}
});
