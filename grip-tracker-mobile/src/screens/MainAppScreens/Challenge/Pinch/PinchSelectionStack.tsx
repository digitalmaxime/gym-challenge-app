
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PinchSelectionScreen } from './PinchSelectionScreen';
import PinchChallenge from './PinchChallenge';
import ChallengeResultSummary from '../ChallengeResultSummary';

function PinchSelectionStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="PinchSelectionScreen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PinchSelectionScreen"
        component={PinchSelectionScreen}
        options={{ title: 'My PinchSelectionScreen' }} //pinchId: pinch.id, gripType: pinch.gripType, subGripType: pinch.subGripType
      />
      <Stack.Screen
        name="PinchChallenge"
        component={PinchChallenge}
        options={{ title: 'Awesome Test', presentation: 'modal' }}
      />
      
    </Stack.Navigator>
  );
}

export default PinchSelectionStack;
