import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import NumericInput from "react-native-numeric-input";
import Colors from "../../constants/styles";

interface NumericInputDurationProps {
    onChange: (value: number) => void;
}

const NumericInputDuration = ({onChange}: NumericInputDurationProps) => {
  return (
    <>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>Duration</Text>

      <NumericInput
        value={0}
        totalWidth={240}
        totalHeight={50}
        iconSize={25}
        textColor="#B0228C"
        onChange={(value) => onChange(value)}
        rightButtonBackgroundColor="#EA3788"
        leftButtonBackgroundColor="#E56B70"
      />
    </>
  );
};

export default NumericInputDuration;

const styles = StyleSheet.create({
  container: {},
});
