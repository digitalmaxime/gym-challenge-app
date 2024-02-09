import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { PinchTypeEnum } from "../../../../models/grip/pinch/PinchTypeEnum";

interface PinchStatsProps {
  challengeProgresses: Record<PinchTypeEnum, ChallengeProgressModel[]>;
}

const PinchStats = (props: PinchStatsProps) => {
  
  function renderItem(itemData: any) {
    const pinchSubType = itemData.item[0];
    const challengeProgresses = itemData.item[1];
    console.log(pinchSubType);
    
    const lineData: { value: number }[] = [];
    
    if (challengeProgresses.length === 0) return (<></>)

    for (const data of challengeProgresses) {
      lineData.push({ value: data?.weight });
    }

    return (
      <View style={styles.graph}>
        <Text>
          {pinchSubType}
        </Text>

        <LineChart
          data={lineData}
          color={"#177AD5"}
          thickness={3}
          dataPointsColor={"red"}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(props.challengeProgresses)}
        keyExtractor={(item) => item[0]} // TODO:
        numColumns={1}
        bounces={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PinchStats;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "yellow",
    padding: 10,
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    // justifyContent: "center"
  },
  graph: {
    backgroundColor: "green",
  },
});
