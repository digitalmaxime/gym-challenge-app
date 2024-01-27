import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PinchSelectionScreen } from './PinchSelectionScreen';
import PinchChallenge from './PinchChallenge';

function PinchSelectionStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="PinchSelectionScreen"
    >
      <Stack.Screen
        name="PinchSelectionScreen"
        component={PinchSelectionScreen}
        options={{title: 'My PinchSelectionScreen' }}
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
