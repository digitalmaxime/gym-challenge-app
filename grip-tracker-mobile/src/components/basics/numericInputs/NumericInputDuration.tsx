import * as React from "react";
import { Text, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import Colors from "../../../constants/styles";

interface NumericInputDurationProps {
  onChange: (value: number) => void;
}

const NumericInputDuration = ({ onChange }: NumericInputDurationProps) => {
  return (
    <>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>Duration</Text>

      <InputSpinner
        min={0}
        step={1}
        value={0}
        onChange={onChange}
        skin='square'
      />
    </>
  );
};

export default NumericInputDuration;

const styles = StyleSheet.create({
  container: {},
});
