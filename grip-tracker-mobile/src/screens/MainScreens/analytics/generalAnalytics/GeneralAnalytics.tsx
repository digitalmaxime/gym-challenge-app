import * as React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { useUserContext } from "../../../../contexts/UserContext";
import Colors from "../../../../constants/styles";
import DistributionGraph from "./generalGraphs/GripTypeDistributionGraph";
import GripTypeLegend from "./GripTypeLegend";
import AssiduityBarGraph from "./generalGraphs/AssiduityBarGraph";

interface GeneralAnalyticsProps {}

const GeneralAnalytics = (props: GeneralAnalyticsProps) => {
  const user = useUserContext();
  let nbCompletedPinchChallenges = 0;
  Object.values(user.challengeProgresses?.PinchProgresses || []).forEach(
    (x) => (nbCompletedPinchChallenges += x.length)
  );
  let nbCompletedDeadhangChallenges = 0;
  Object.values(user.challengeProgresses?.DeadhangProgresses || []).forEach(
    (x) => {
      return (nbCompletedDeadhangChallenges += x.length);
    }
  );
  let nbCompletedCrimpChallenges = 0;
  Object.values(user.challengeProgresses?.CrimpProgresses || []).forEach(
    (x) => (nbCompletedCrimpChallenges += x.length)
  );
  let nbTotalCompletedChallenges =
    nbCompletedPinchChallenges +
    nbCompletedDeadhangChallenges +
    nbCompletedCrimpChallenges;

  const data = [
    {
      value: nbCompletedPinchChallenges,
      color: Colors.pinchColor,
      text:
        Math.round(
          (nbCompletedPinchChallenges / nbTotalCompletedChallenges) * 100
        ) + "%",
    },
    {
      value: nbCompletedDeadhangChallenges,
      color: Colors.deadhangColor,
      text:
        Math.round(
          (nbCompletedDeadhangChallenges / nbTotalCompletedChallenges) * 100
        ) + "%",
    },
    {
      value: nbCompletedCrimpChallenges,
      color: Colors.crimpColor,
      text:
        Math.round(
          (nbCompletedCrimpChallenges / nbTotalCompletedChallenges) * 100
        ) + "%",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, margin: 10 }}>Distribution </Text>

        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <GripTypeLegend />
          <DistributionGraph data={data} />
        </View>
      </View>
      
      <AssiduityBarGraph />
      
    </ScrollView>
  );
};

export default GeneralAnalytics;

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: 'turquoise',
    padding: 20,
    // paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
