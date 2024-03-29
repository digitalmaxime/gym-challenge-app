import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GripChallengeSelectionScreen from './GripChallengeSelectionScreen';
import PinchSelectionStack from './Pinch/PinchSelectionStack';
import ChallengeResultSummary from './ChallengeResultSummary';
import DeadhangSelectionStack from './DeadHang/DeadhangSelectionStack';
import CrimpSelectionStack from './Crimp/CrimpSelectionStack';
import Colors from '../../../constants/styles';

function GripChallengeSelectionStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: Colors.headerStyleBackgroundColor },
      }}
    >
      <Stack.Screen
        name="GripSelectionScreen"
        component={GripChallengeSelectionScreen}
        options={{ title: 'My GripSelectionScreen' }}
      />
      <Stack.Screen
        name="DeadhangSelectionStack"
        component={DeadhangSelectionStack}
        options={{ title: 'Awesome DeadhangSelectionScreen' }}
      />
      <Stack.Screen
        name="CrimpSelectionStack"
        component={CrimpSelectionStack}
        options={{ title: 'Awesome CrimpSelectionStack' }}
      />
      <Stack.Screen
        name="PinchSelectionStack"
        component={PinchSelectionStack}
        options={{ title: 'Awesome PinchSelectionStack' }}
      />
      <Stack.Screen
        name="ChallengeResultSummary"
        component={ChallengeResultSummary}
        options={{ title: 'Awesome ChallengeResultSummary' }}
      />
    </Stack.Navigator>
  );
}

export default GripChallengeSelectionStack;
