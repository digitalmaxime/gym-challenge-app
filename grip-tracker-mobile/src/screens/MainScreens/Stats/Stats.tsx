import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useUserContext } from "../../../contexts/UserContext";
import { GripTypeEnum } from "../../../models/grip/GripTypeEnum";
import { SubGripTypeEnum } from "../../../models/grip/SubGripTypeEnum";
import * as Controller from "../../../api/controller";
import { useState } from "react";
import PinchStats from "./PinchStats/PinchStats";

interface StatsProps {}

const Stats = (props: StatsProps) => {
  const user = useUserContext();

  // new Date(a.timestamp).getTime() - new Date(b?.timestamp).getTime()

  function renderProgressStats(itemData: any) {
    // const progressData = itemData.item as ChallengeProgressModel;
    
    return (
      <PinchStats challengeProgresses={user.challengeProgresses} />
     
    );
  }

  return (
    <FlatList
      data={user.challengeProgresses}
      keyExtractor={(item) => item.id}
      numColumns={1}
      bounces={false}
      renderItem={renderProgressStats}
    />
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {},
});

// ref : https://gifted-charts.web.app/linechart
