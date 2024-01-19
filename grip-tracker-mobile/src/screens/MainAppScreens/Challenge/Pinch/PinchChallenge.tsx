import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Dispatch } from 'react';
import Colors from '../../../../constants/styles';
import CheckBtnComponent from '../../../../components/basics/CheckBtnComponent';
import * as Controller from '../../../../controller/controller';

export interface PinchChallengeProps {
  finishChallenge: Dispatch<React.SetStateAction<void>>;
}

export function PinchChallenge() {
  const [durationInSeconds, setDurationInSeconds] = React.useState(0);
  const [weightInKilos, setWeightInKilos] = React.useState(0);

  return (
    <View>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>Weight</Text>
      <NumericInput
        type="up-down"
        value={weightInKilos}
        totalWidth={240}
        totalHeight={50}
        iconSize={25}
        textColor="#B0228C"
        onChange={value => setWeightInKilos(value)}
        rightButtonBackgroundColor="#EA3788"
        leftButtonBackgroundColor="#E56B70"
      />

      <Text style={{ color: Colors.textColor, fontSize: 26 }}>Seconds</Text>

      <NumericInput
        type="up-down"
        value={durationInSeconds}
        totalWidth={240}
        totalHeight={50}
        iconSize={25}
        textColor="#B0228C"
        onChange={value => setDurationInSeconds(value)}
        rightButtonBackgroundColor="#EA3788"
        leftButtonBackgroundColor="#E56B70"
      />

      <CheckBtnComponent
        handleCheckPress={() => true}
        saveData={() => Controller.saveChallengeResult('1', '2', weightInKilos, durationInSeconds)}
      />
    </View>
  );
}

export default PinchChallenge;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.lessonBackgroundColor,
  },
  pinch_container: {
    margin: 30,
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  pinchTask: {
    fontSize: 20,
    padding: 15,
    margin: 15,
    flexDirection: 'row',
    color: Colors.textLessonColor,
    borderColor: 'red',
    borderWidth: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
