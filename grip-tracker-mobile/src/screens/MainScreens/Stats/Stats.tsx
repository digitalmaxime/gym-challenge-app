import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useUserContext } from "../../../contexts/UserContext";
import { GripTypeEnum } from "../../../models/grip/GripTypeEnum";
import { SubGripTypeEnum } from "../../../models/grip/SubGripTypeEnum";
import * as Controller from "../../../api/controller";
import { useState } from "react";

interface StatsProps {}

const Stats = (props: StatsProps) => {
  const user = useUserContext();
  const [progress, setProgress] = useState<ChallengeProgressModel[]>([]);

  React.useEffect(() => {
    const fnc = async () => {
      console.log("FNC <---");
      const fetchedPinchProgress = (
        await Controller.getChallengeProgress(
          user.userData.id,
          GripTypeEnum.Pinch,
          SubGripTypeEnum.wideDeep
        )
      ).data;
      setProgress((_) =>
        fetchedPinchProgress.sort((a, b) => {
          return (
            new Date(a.timestamp).getTime() - new Date(b?.timestamp).getTime()
          );
        })
      );
    };

    fnc();
  }, []);

  const lineData: { value: number }[] = [];
  for(const data of progress) {
    lineData.push({value: data.weight});
  }

  const lineData2 = [
    { value: 0, dataPointText: "0" },
    { value: 20, dataPointText: "20" },
    { value: 18, dataPointText: "18" },
    { value: 40, dataPointText: "40" },
    { value: 36, dataPointText: "36" },
    { value: 60, dataPointText: "60" },
    { value: 54, dataPointText: "54" },
    { value: 85, dataPointText: "85" },
  ];

  return (
    <View style={styles.container}>
      <LineChart
        data={lineData}
        color={"#177AD5"}
        thickness={3}
        dataPointsColor={"red"}
      />

      <Text></Text>

      <View style={{ backgroundColor: "#1A3461" }}>
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
      </View>

      <Text></Text>

      <View style={{ backgroundColor: "#1A3461" }}>
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
      </View>
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {},
});

// ref : https://gifted-charts.web.app/linechart
