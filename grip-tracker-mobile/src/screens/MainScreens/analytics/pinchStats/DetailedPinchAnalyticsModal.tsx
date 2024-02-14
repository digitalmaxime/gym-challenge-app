import * as React from "react";
import { Text, StyleSheet, Modal, ScrollView, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Colors from "../../../../constants/styles";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
import { DateTimeService } from "../../../../services/dateTime/DateTimeService";
import { WeekDays } from "../../../../constants/Date/DateConstantes";
import PinchGraph from "./pinchGraph/PinchGraph";
import { IconButton, List, SegmentedButtons } from "react-native-paper";

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

  challengeProgresses.sort(
    (a, b) =>
      new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime()
  );

  const weekBarData: { value: number; label: string }[] = [];

  for (let x of DateTimeService.getPastWeekDates()) {
    const found = challengeProgresses.find(
      (progress) =>
        new Date(progress.timestamp!).setHours(0, 0, 0, 0) ==
        new Date(x.date!).setHours(0, 0, 0, 0)
    );
    weekBarData.push({
      value: found?.weight || 0,
      label: WeekDays[x.day].substring(0, 2),
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
        contentContainerStyle={styles.container}
      >
        <Text>{challenge.name}</Text>

        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>All time record</Text>

        <View>
          <>
            <SegmentedButtons // TODO: Choose between week / month / year / all time
              value={"walk"}
              onValueChange={() => console.log("asdf")}
              buttons={[
                {
                  value: "walk",
                  label: "Walking",
                },
                {
                  value: "train",
                  label: "Transit",
                },
                { value: "drive", label: "Driving" },
              ]}
            />
          </>
          <PinchGraph weekBarData={weekBarData} />
        </View>

        <Text></Text>
        {/* <BarChart
          width={300}
          rotateLabel
          noOfSections={5}
          maxValue={3}
          stackData={stackDataWeeklyActivity}
        /> */}
        {/* <PieChart data={data} /> */}
      </ScrollView>
    </Modal>
  );
};

export default DetailedPinchAnalyticsModal;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'turquoise',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
