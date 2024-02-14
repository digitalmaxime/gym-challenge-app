import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useUserContext } from "../../../../contexts/UserContext";

const DeadhangStats = () => {
  const user = useUserContext();

  function renderItem(itemData: any) {
    const deadhangSubType = itemData.item[0];
    const challengeProgresses = itemData.item[1];
    console.log(deadhangSubType);

    const lineData: { value: number }[] = [];

    if (challengeProgresses.length > 0) {
      for (const data of challengeProgresses) {
        lineData.push({ value: data?.duration });
      }
    }

    return (
      <View style={styles.graph}>
        <Text>{deadhangSubType}</Text>

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
        data={Object.entries(
          user.challengeProgresses?.DeadhangProgresses || []
        )}
        keyExtractor={(item) => item[0]} // TODO:
        numColumns={1}
        bounces={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DeadhangStats;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "turquoise",
    padding: 10,
    margin: 20,
    flex: 1,
    width: "80%",
    flexDirection: "column",
    alignItems: "flex-start",
    // justifyContent: "center"
  },
  graph: {
    backgroundColor: "green",
    width: 500,
  },
});
