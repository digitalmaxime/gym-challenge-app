import * as React from "react";
import { Text, Switch, View, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import Colors from "../../../constants/styles";
import { useState } from "react";
import { IconBtn } from "../btn/IconButton";

interface NumericInputWeightProps {
  onChange: (value: number) => void;
}

export const POUNDS_KILOS_RATIO = 2.205;

const NumericInputWeight = ({ onChange }: NumericInputWeightProps) => {
  const [useKilograms, setUseKilograms] = useState(true);
  const toggleSwitch = () => setUseKilograms((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>Weight</Text>

      <View style={styles.switch}>
        <IconBtn
          iconName="weight-pound"
          iconSize={50}
          iconColor={Colors.Pounds}
          onPress={() => {
            if (useKilograms) toggleSwitch();
          }}
          disabled={false}
        />
        <Switch
          trackColor={{ false: "#767577", true: Colors.KiloTracker }}
          thumbColor={useKilograms ? Colors.Kilos : Colors.Pounds}
          ios_backgroundColor={Colors.PoundTracker}
          onValueChange={toggleSwitch}
          value={useKilograms}
        />
        <IconBtn
          iconName="weight-kilogram"
          iconSize={50}
          iconColor={Colors.Kilos}
          onPress={() => {
            if (!useKilograms) toggleSwitch();
          }}
          disabled={false}
        />
      </View>

      <InputSpinner
        min={-9999}
        step={1}
        value={0}
        onChange={(value: number) => {
          if (!useKilograms) {
            value = value / POUNDS_KILOS_RATIO;
          }
          onChange(value);
        }}
        skin="square"
      />
    </View>
  );
};

export default NumericInputWeight;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: 300,
  },
});
