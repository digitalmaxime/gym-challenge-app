import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PinchSelectionScreen } from './PinchSelectionScreen';
import PinchChallenge from './PinchChallenge';

function PinchSelectionStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="PinchSelectionScreen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PinchSelectionScreen"
        component={PinchSelectionScreen}
        options={{ title: 'PinchSelectionScreen' }}
      />
      <Stack.Screen
        name="PinchChallenge"
        component={PinchChallenge}
        options={{ title: 'PinchChallenge', presentation: 'modal' }}
      />

    </Stack.Navigator>
  );
}

export default PinchSelectionStack;
