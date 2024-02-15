import * as React from "react";
import { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Months } from "../../../../../constants/Date/DateConstants";

interface YearPinchGraphProps {
  data: { value: number; label: string }[];
}

const YearPinchGraph = ({ data }: YearPinchGraphProps) => {
  const ref = useRef<any>(null);

  const showOrHidePointer = (ind: number) => {
    ref.current?.scrollTo({
      x: ind * 200 - 25,
    }); // adjust as per your UI
  };

  const months = Object.values(Months)
    .slice(0, Object.values(Months).length / 2)
    .map((m) => m.toString().substring(0, 2) + " ");

    const quarters = [months.slice(0, 3), months.slice(3, 6), months.slice(6, 9), months.slice(9, 12)];

    console.log(quarters)

  return (
    <View style={styles.scrollContainer}>
      
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        <LineChart
          scrollRef={ref}
          data={data}
          curved
          initialSpacing={0}
          rotateLabel
        />
      </ScrollView>
      <View style={{ flexDirection: "row"}}>
        {quarters.map((item, index) => {
          console.log("INDEX: ", index);
          console.log("VAL: ", item);
          return (
            <TouchableOpacity
              key={index}
              style={{
                padding: 5,
                margin: 3,
                backgroundColor: "#ebb",
                borderRadius: 8,
              }}
              onPress={() => showOrHidePointer(index)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default YearPinchGraph;

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    // backgroundColor: "yellow",
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
});
