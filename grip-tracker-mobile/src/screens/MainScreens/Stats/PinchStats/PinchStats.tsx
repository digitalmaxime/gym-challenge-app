import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface PinchStatsProps {
    challengeProgresses: ChallengeProgressModel[];
}

const PinchStats = (props: PinchStatsProps) => {
    const lineData: { value: number }[] = [];
    for (const data of props.challengeProgresses) {
      lineData.push({ value: data.weight });
    }

  return (
    <View style={styles.container}>
      <Text>PinchStats</Text>

      <View style={styles.container}>
        <LineChart
          data={lineData}
          color={"#177AD5"}
          thickness={3}
          dataPointsColor={"red"}
        />

        <Text></Text>

        {/* <View style={{ backgroundColor: "#1A3461" }}>
          <LineChart
            initialSpacing={0}
            data={lineData}
            spacing={30}
            hideDataPoints
            thickness={5}
            hideRules
            hideYAxisText
            yAxisColor="#0BA5A4"
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
          />
        </View> */}

        <Text></Text>

        {/* <View style={{ backgroundColor: "#1A3461" }}>
          <LineChart
            initialSpacing={0}
            data={lineData}
            spacing={30}
            textColor1="yellow"
            textShiftY={-8}
            textShiftX={-10}
            textFontSize={13}
            thickness={5}
            hideRules
            hideYAxisText
            yAxisColor="#0BA5A4"
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
          />
        </View> */}
      </View>
    </View>
  );
};

export default PinchStats;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  }
});
