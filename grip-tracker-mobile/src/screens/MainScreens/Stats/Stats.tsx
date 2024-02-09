import * as React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useUserContext } from "../../../contexts/UserContext";
import PinchStats from "./PinchStats/PinchStats";

interface StatsProps {}

const Stats = (props: StatsProps) => {
  const user = useUserContext();
  
  return (
    <View style={styles.container}>
      <PinchStats challengeProgresses={user.challengeProgresses?.PinchProgresses} />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

// ref : https://gifted-charts.web.app/linechart
