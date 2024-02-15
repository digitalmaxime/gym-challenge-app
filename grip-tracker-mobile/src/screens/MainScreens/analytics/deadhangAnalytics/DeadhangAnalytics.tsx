import * as React from "react";
import { Text, View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useUserContext } from "../../../../contexts/UserContext";
import PinchTypeAnalyticsCard from "../pinchAnalytics/PinchTypeAnalyticsCard";

const DeadhangAnalytics = () => {
  const user = useUserContext();

  const populatedProgresses = Object.entries(
    user.challengeProgresses?.DeadhangProgresses || []
  )?.filter((x) => x[1].length > 0);

  const renderItem: ListRenderItem<[string, ChallengeProgressModel[]]> = (itemData) => {
    const challengeProgresses = itemData.item[1].sort(
    (a, b) =>
      new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime()
  );

    return <PinchTypeAnalyticsCard challengeProgresses={challengeProgresses} />;
  }
  return (
    <View style={styles.container}>
      
      {populatedProgresses.length === 0 && (
        <Text style={styles.message}>
          No Pinch challenge yet recorded,
          {"\n"}
          Start doing pinch challenges!
        </Text>
      )}

      <FlatList
        data={populatedProgresses}
        keyExtractor={(item) => item[0]}
        numColumns={1}
        bounces={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
};

export default DeadhangAnalytics;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    flex: 1,
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    width: "100%",
  },
  message: {
    fontSize: 24,
    margin: 30,
  },
});
