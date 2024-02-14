import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PinchSelectionStack from './pinch/PinchSelectionStack';
import DeadhangSelectionStack from './deadHang/DeadhangSelectionStack';
import CrimpSelectionStack from './crimp/CrimpSelectionStack';
import Colors from '../../../constants/styles';
import GripChallengeSelectionScreen from './GripChallengeSelectionScreen';
import ChallengeResultSummary from './ChallengeResultSummary';

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
        options={{title: "grip options"}}
      />
      <Stack.Screen
        name="DeadhangSelectionStack"
        component={DeadhangSelectionStack}
        options={{title: ""}}
        />
      <Stack.Screen
        name="CrimpSelectionStack"
        component={CrimpSelectionStack}
        options={{title: ""}}
        />
      <Stack.Screen
        name="PinchSelectionStack"
        component={PinchSelectionStack}
        options={{title: ""}}
      />
      <Stack.Screen
        name="ChallengeResultSummary"
        component={ChallengeResultSummary}
      />
    </Stack.Navigator>
  );
}

export default GripChallengeSelectionStack;
