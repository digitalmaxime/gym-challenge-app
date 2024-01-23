import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GripSelectionScreen from './GripSelectionScreen';
import { CrimpSelectionScreen } from './Crimp/CrimpSelectionScreen';
import PinchSelectionStack from './Pinch/PinchSelectionStack';
import ChallengeResultSummary from './ChallengeResultSummary';
import DeadhangSelectionStack from './DeadHang/DeadhangSelectionStack';

function GripSelectionStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="GripSelectionScreen"
        component={GripSelectionScreen}
        options={{ title: 'My GripSelectionScreen' }}
      />
      <Stack.Screen
        name="DeadhangSelectionStack"
        component={DeadhangSelectionStack}
        options={{ title: 'Awesome DeadhangSelectionScreen' }}
      />
      <Stack.Screen
        name="CrimpSelectionScreen"
        component={CrimpSelectionScreen}
        options={{ title: 'Awesome CrimpSelectionScreen' }}
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

export default GripSelectionStack;
