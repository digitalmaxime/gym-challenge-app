import * as React from "react";
import { View, StyleSheet } from "react-native";

import { IconBtn } from "../../../components/basics/btn/IconButton";

export enum AnalyticsNavigationOptions {
  General,
  Pinch,
  Deadhang,
  Crimp,
}

interface StatsNavigationProps {
  setGripTypeOption: React.Dispatch<React.SetStateAction<AnalyticsNavigationOptions>>;
}

const AnalyticsNavigation = ({ setGripTypeOption }: StatsNavigationProps) => {
  return (
    <View style={styles.container}>
      <IconBtn
        onPress={() => setGripTypeOption((_) => AnalyticsNavigationOptions.General)}
        iconName={"trophy"}
        disabled={false}
        text="general"
      />
      <IconBtn
        onPress={() => setGripTypeOption(AnalyticsNavigationOptions.Pinch)}
        iconName={"home"}
        disabled={false}
        text="pinch"
      />
      <IconBtn
        onPress={() => setGripTypeOption(AnalyticsNavigationOptions.Deadhang)}
        iconName={"trophy"}
        disabled={false}
        text="hang"
      />
      <IconBtn
        onPress={() => setGripTypeOption(AnalyticsNavigationOptions.Crimp)}
        iconName={"home"}
        disabled={false}
        text="crimp"
      />
    </View>
  );
};

export default AnalyticsNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
    backgroundColor: "turquoise",
    width: "100%",
    height: 60,
  },
});
