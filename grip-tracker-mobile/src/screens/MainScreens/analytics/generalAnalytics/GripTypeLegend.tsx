import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../../../constants/styles";

interface GripTypeLegendProps {}

const GripTypeLegend = (props: GripTypeLegendProps) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: Colors.pinchColor,
            },
          ]}
        />
        <Text style={{margin: 5}}>Pinch</Text>
      </View>

      <View  style={{flexDirection: "row"}}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: Colors.deadhangColor,
            },
          ]}
        />
        <Text style={{margin: 5}}>Deadhang</Text>
      </View>

      <View  style={{flexDirection: "row"}}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: Colors.crimpColor,
            },
          ]}
        />
        <Text style={{margin: 5}}>Crimp</Text>
      </View>
    </View>
  );
};

export default GripTypeLegend;

const styles = StyleSheet.create({
  container: {},
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
