/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Image, View, Text, Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ButtonImg, ButtonText } from '../../../../components/basics/Buttons';
import PinchSelectionModal from '../../../../components/gripChallenges/pinchSelection/PinchSelectionObsolete';
import Colors from '../../../../constants/styles';
import { useUserContext } from '../../../../contexts/UserContext';
import { Test } from '../../test';
import GripSelectionScreen from '../GripSelectionScreen';
import { CrimpSelectionScreen } from '../Crimp/CrimpSelectionScreen';
import { DeadhangSelectionScreen } from '../DeadHang/DeadhangSelectionScreen';
import { PinchSelectionScreen } from './PinchSelectionScreen';
import PinchChallengeObsolete from '../../../../components/gripChallenges/pinchSelection/PinchChallengeObsolete';
import PinchChallenge from './PinchChallenge';

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
        options={{ title: 'My PinchSelectionScreen' }}
      />
      <Stack.Screen
        name="PinchChallenge"
        component={PinchChallenge}
        options={{ title: 'Awesome Test' }}
      />
    </Stack.Navigator>
  );
}

export default PinchSelectionStack;
