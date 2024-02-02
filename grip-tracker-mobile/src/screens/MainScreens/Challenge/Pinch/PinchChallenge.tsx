import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CheckBtnComponent from '../../../../components/basics/btn/CheckBtnComponent';
import * as Controller from '../../../../api/controller';
import { GripModel } from '../../../../models/grip/GripModel';
import { useUserContext } from '../../../../contexts/UserContext';
import NumericInputWeight from '../../../../components/basics/numericInputs/NumericInputWeight';
import NumericInputDuration from '../../../../components/basics/numericInputs/NumericInputDuration';
import { useToast } from 'react-native-toast-notifications';
import { ChallengeSummaryPathParam } from '../ChallengeResultSummary';

type pathParam = {
  pinch: GripModel;
};

type RootStackParamList = {
  ChallengeResultSummary: ChallengeSummaryPathParam;
};

export function PinchChallenge() {
  const user = useUserContext();
  const toast = useToast();

  const [durationInSeconds, setDurationInSeconds] = React.useState(0);
  const [weightInKilos, setWeightInKilos] = React.useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<pathParam>>();

  const gripId = route.params.id;
  const { gripType } = route.params;
  const { subGripType } = route.params;

  return (
    <View style={styles.mainContainer}
    >
      <Text>{subGripType} {gripType} challenge
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
          // TODO: check if user still connected
          if (user.userData === undefined) {
            toast.show(
              "user disconnected, enable to save your results",
              {
                type: "warning",
                placement: "top",
                duration: 8000,
                animationType: "zoom-in",
                swipeEnabled: true,
              }
            );
          }
          try {
            Controller.saveChallengeResult(
              user.userData.id,
              gripId,
              weightInKilos,
              durationInSeconds,
              );
              navigation.goBack();
              setTimeout(() => {
                navigation.navigate('ChallengeResultSummary', {
                  gripType,
                  subGripType,
                  weight: weightInKilos,
                  duration: durationInSeconds});
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    padding: 30,
    flexDirection: 'column',
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
    borderColor: 'red',
    borderWidth: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
