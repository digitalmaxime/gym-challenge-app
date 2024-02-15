import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts/src/BarChart";
import Colors from "../../../../../constants/styles";
import { useUserContext } from "../../../../../contexts/UserContext";
import { DateTimeService } from "../../../../../services/dateTime/DateTimeService";
import { Months } from "../../../../../constants/Date/DateConstants";

interface AssiduityBarGraphProps {}

const AssiduityBarGraph = (props: AssiduityBarGraphProps) => {
  const user = useUserContext();
  const pinch: ChallengeProgressModel[] = [];
  const deadhang: ChallengeProgressModel[] = [];
  const crimp: ChallengeProgressModel[] = [];

  for (let arr of Object.values(
    Object.values(user.challengeProgresses?.PinchProgresses || [])
  )) {
    arr.forEach((x) => pinch.push(x));
  }
  for (let arr of Object.values(
    Object.values(user.challengeProgresses?.DeadhangProgresses || [])
  )) {
    arr.forEach((x) => {
      console.log("!!!");
      console.log(x);
      deadhang.push(x);
    });
  }
  for (let arr of Object.values(
    Object.values(user.challengeProgresses?.CrimpProgresses || [])
  )) {
    arr.forEach((x) => crimp.push(x));
  }

  const stackDataWeeklyActivity0: any[] = [];

  for (let date of DateTimeService.getPastMonthDates()) {
    const pinchMatchingDateProgress = pinch.findIndex(
      (progress) =>
        new Date(progress.timestamp!).setHours(0, 0, 0, 0) ==
        new Date(date.date!).setHours(0, 0, 0, 0)
    );

    let pinchValue = {
      value: pinchMatchingDateProgress === -1 ? 0 : 1,
      color: Colors.pinchColor,
    };

    const deadhangMatchingDateProgress = deadhang.findIndex(
      (progress) =>
        new Date(progress.timestamp!).setHours(0, 0, 0, 0) ==
        new Date(date.date!).setHours(0, 0, 0, 0)
    );
    console.log(deadhangMatchingDateProgress);
    let deadhangValue = {
      value: deadhangMatchingDateProgress === -1 ? 0 : 1,
      color: Colors.deadhangColor,
    };

    stackDataWeeklyActivity0.push({
      stacks: [pinchValue, { ...deadhangValue, marginBottom: 2 }],
      label: date.date.getDate(),
    });
  }

  return (
    <View style={styles.container}>
      <Text style={{ margin: 15, fontSize: 18 }}>
        {Months[new Date().getMonth()]} assiduity
      </Text>
      <BarChart
        width={300}
        // rotateLabel
        noOfSections={3}
        maxValue={3}
        showYAxisIndices={false}
        hideYAxisText={true}
        stackData={stackDataWeeklyActivity0}
      />
    </View>
  );
};

export default AssiduityBarGraph;

const styles = StyleSheet.create({
  container: {},
});
