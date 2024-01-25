import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Dispatch } from 'react';
import { ButtonIcon } from '../../basics/Buttons';
import Colors from '../../../constants/styles';

export interface PinchChallengeProps {
  finishChallenge: Dispatch<React.SetStateAction<void>>;
}

export function PinchChallengeObsolete({ finishChallenge }: PinchChallengeProps) {
  const [timeInSeconds, setTimeInSeconds] = React.useState(0);
  const [isTimerActive, setIsTimerActive] = React.useState(false);

  function timer() {
    if (!isTimerActive) return;

    setTimeout(() => {
      setTimeInSeconds((prevTime) => prevTime + 1);
      timer();
    }, 1000);
  }

  React.useEffect(() => {
    setIsTimerActive(true);
    timer();
  }, [isTimerActive]);

  return (
    <View>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>my text</Text>
      <NumericInput
        type="up-down"
        onChange={value => setTimeInSeconds(value)}
      />
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>my text</Text>
      <Text style={{ color: Colors.textColor, fontSize: 26 }}>
        {timeInSeconds}
      </Text>
      <ButtonIcon
        iconName="stop"
        onPress={finishChallenge}
        iconSize={30}
        btnSize={32}
        color={Colors.cancel2}
        btnBackgroundColor={Colors.btnUnitBackgroundColor}
        disabled={false}
      />
    </View>
  );
}

export default PinchChallengeObsolete;

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
