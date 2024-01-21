import * as React from 'react';
import { View, Text } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Colors from '../../constants/styles';
import { ButtonIcon } from '../basics/Buttons';

export interface TimerProps {
}

export function Timer(props: TimerProps) {
  const [timeInSeconds, setTimeInSeconds] = React.useState(0);
  const [isTimerActive, setIsTimerActive] = React.useState(false);

  function timer() {
    if (!isTimerActive) return;

    setTimeout(() => {
      setTimeInSeconds(prevTime => prevTime + 1);
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
        iconName="circle-medium"
        onPress={() => setIsTimerActive(true)}
        iconSize={30}
        btnSize={32}
        color={Colors.cancel2}
        btnBackgroundColor={Colors.btnUnitBackgroundColor}
        disabled={false}
      />
      <ButtonIcon
        iconName="stop"
        onPress={() => setIsTimerActive(false)}
        iconSize={30}
        btnSize={32}
        color={Colors.cancel2}
        btnBackgroundColor={Colors.btnUnitBackgroundColor}
        disabled={false}
      />
    </View>
  );
}
