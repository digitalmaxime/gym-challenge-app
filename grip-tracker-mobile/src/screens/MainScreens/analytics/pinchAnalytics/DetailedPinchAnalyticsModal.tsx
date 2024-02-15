import * as React from "react";
import {
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  View,
} from "react-native";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
import { DateTimeService } from "../../../../services/dateTime/DateTimeService";
import { TimePeriod, WeekDays } from "../../../../constants/Date/DateConstants";
import WeekPinchGraph from "./pinchGraphs/WeekPinchGraph";
import { SegmentedButtons } from "react-native-paper";
import { useState } from "react";
import YearPinchGraph from "./pinchGraphs/YearPinchGraph";
import MonthPinchGraph from "./pinchGraphs/MonthPinchGraph";

interface DetailedPinchAnalyticsProps {
  modalVisible: boolean;
  toggleModal: () => void;
  challenge: ChallengeModel;
  challengeProgresses: ChallengeProgressModel[];
}

const DetailedPinchAnalyticsModal = ({
  modalVisible,
  toggleModal,
  challenge,
  challengeProgresses,
}: DetailedPinchAnalyticsProps) => {
  const [timePeriod, setTimePeriod] = useState<string>(
    TimePeriod[TimePeriod.Week]
  );

  const weekBarData: { value: number; label: string }[] = [];

  for (let x of DateTimeService.getPastWeekDates()) {
    const matchingDateProgress = challengeProgresses.find(
      (progress) =>
        new Date(progress.timestamp!).setHours(0, 0, 0, 0) ==
        new Date(x.date!).setHours(0, 0, 0, 0)
    );
    weekBarData.push({
      value: matchingDateProgress?.weight || 0,
      label: WeekDays[x.day].substring(0, 2),
    });
  }

  const monthBarData: { value: number; label: string }[] = [];

  for (let x of DateTimeService.getPastMonthDates()) {
    const matchingDateProgress = challengeProgresses.find(
      (progress) =>
        new Date(progress.timestamp!).setHours(0, 0, 0, 0) ==
        new Date(x.date!).setHours(0, 0, 0, 0)
    );
    monthBarData.push({
      value: matchingDateProgress?.weight || 0,
      label: x.day.toString(),
    });
  }

  return (
    <Modal
      visible={modalVisible}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={() => {
        toggleModal();
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 18, margin: 20, alignSelf: "flex-start" }}>
            {challenge.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              margin: 10,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ fontSize: 15, margin: 5 }}>All time record</Text>
            <Text style={{ fontSize: 15, margin: 5 }}>
              {Math.max(...challengeProgresses.map((x) => x.weight))}
            </Text>
          </View>

          <View style={styles.timePeriodOption}>
            <Text style={{ fontSize: 16 }}>progress</Text>
            <SegmentedButtons
              style={{ width: 200, height: 40, padding: 0, margin: 10 }}
              value={timePeriod}
              onValueChange={setTimePeriod}
              buttons={[
                {
                  value: TimePeriod[TimePeriod.Week],
                  label: TimePeriod[TimePeriod.Week],
                },
                {
                  value: TimePeriod[TimePeriod.Month],
                  label: TimePeriod[TimePeriod.Month],
                },
                {
                  value: TimePeriod[TimePeriod.Year],
                  label: TimePeriod[TimePeriod.Year],
                },
              ]}
            />
          </View>

          {timePeriod == TimePeriod[TimePeriod.Week] && (
            <WeekPinchGraph data={weekBarData} />
          )}

          {timePeriod == TimePeriod[TimePeriod.Month] && (
            <MonthPinchGraph data={monthBarData} />
          )}

          {timePeriod == TimePeriod[TimePeriod.Year] && (
            <YearPinchGraph data={monthBarData} />
          )}
        </View>

        <Text style={{margin: 20}}>Leader Board</Text>
      </ScrollView>
    </Modal>
  );
};

export default DetailedPinchAnalyticsModal;

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: 'turquoise',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // backgroundColor: 'green',
    justifyContent: "center",
    alignItems: "center",
  },
  timePeriodOption: {
    // backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
});
