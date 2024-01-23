import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GripModel } from '../../../../models/grip/GripModel';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUserContext } from '../../../../contexts/UserContext';
import * as Controller from '../../../../api/controller';
import NumericInput from 'react-native-numeric-input';
import CheckBtnComponent from '../../../../components/basics/CheckBtnComponent';
import Colors from '../../../../constants/styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeadhangChallengeProps {}

type ParamList = {
  deadhang: GripModel;
};

type RootStackParamList = Record<string, Record<string, never>>;

const DeadhangChallenge = () => {
  const user = useUserContext();
  const [durationInSeconds, setDurationInSeconds] = React.useState(0);
  const [weightInKilos, setWeightInKilos] = React.useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<ParamList>>();

  const gripId = route.params.id;
  const { gripType } = route.params;
  const { subGripType } = route.params;

  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Text style={{
        color: Colors.textColor, fontSize: 36, margin: 30,
      }}
      >{subGripType} {gripType} challenge
      </Text>

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
        saveData={() => {
          Controller.saveChallengeResult(
            user.userData.id,
            gripId,
            weightInKilos,
            durationInSeconds,
          );
          try {
            navigation.goBack();
            setTimeout(() => {
              navigation.navigate('ChallengeResultSummary', {});
            }, 400);
          } catch (error) {
            console.log(':(');
            console.log(error);
          }
        }}
      />
    </View>
  );
};

export default DeadhangChallenge;

const styles = StyleSheet.create({
  container: {}
});
