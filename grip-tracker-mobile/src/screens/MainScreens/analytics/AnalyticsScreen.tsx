import * as React from "react";
import { StyleSheet, View } from "react-native";
import DeadhangStats from "./deadhangStats/DeadhangStats";
import Header from "../../../components/header/Header";
import { useState } from "react";
import GeneralAnalytics from "./generalAnalytics/GeneralAnalytics";
import AnalyticsNavigation, { AnalyticsNavigationOptions } from "./AnalyticsNavigation";
import PinchAnalytics from "./pinchStats/PinchAnalytics";

const AnalyticsScreen = () => {
  const [gripTypeOption, setGripTypeOption] = useState<AnalyticsNavigationOptions>(
    AnalyticsNavigationOptions.General
  );

  let content: React.JSX.Element | undefined;
  if (gripTypeOption === AnalyticsNavigationOptions.General) {
    content = <GeneralAnalytics />;
  } else if (gripTypeOption === AnalyticsNavigationOptions.Pinch) {
    content = <PinchAnalytics />;
  } else if (gripTypeOption === AnalyticsNavigationOptions.Deadhang) {
    content = <DeadhangStats />;
  } else if (gripTypeOption === AnalyticsNavigationOptions.Crimp) {
    content = <DeadhangStats />;
  }

  return (
    <View style={styles.container}>
      <Header></Header>

      <AnalyticsNavigation setGripTypeOption={setGripTypeOption} />

      <View style={styles.contentContainer}>
        {content && content}
      </View>
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    // backgroundColor: 'blue',
  },
});
