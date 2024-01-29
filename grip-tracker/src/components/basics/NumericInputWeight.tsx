import * as React from "react";
import { Text } from "react-native";
import NumericInput from "react-native-numeric-input";
import Colors from "../../constants/styles";

interface NumericInputWeightProps {
    onChange: (value: number) => void;
}

const NumericInputWeight = ({onChange}: NumericInputWeightProps) => {
  return (
    <>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>Weight</Text>

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

export default NumericInputWeight;
