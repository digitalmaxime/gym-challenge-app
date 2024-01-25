import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CheckBtnComponent from '../../../../components/basics/CheckBtnComponent';
import * as Controller from '../../../../api/controller';
import { GripModel } from '../../../../models/grip/GripModel';
import { useUserContext } from '../../../../contexts/UserContext';
import Colors from '../../../../constants/styles';
import NumericInput from 'react-native-numeric-input'
import NumericInputWeight from '../../../../components/basics/NumericInputWeight';
import NumericInputDuration from '../../../../components/basics/NumericInputDuration';

type ParamList = {
  pinch: GripModel;
};

type RootStackParamList = Record<string, Record<string, never>>;

export function PinchChallenge() {
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

      <NumericInputDuration
        onChange={setDurationInSeconds}
      />

      <NumericInputWeight 
        onChange={setWeightInKilos}
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
