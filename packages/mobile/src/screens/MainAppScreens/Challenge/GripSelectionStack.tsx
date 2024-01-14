/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Image, View, Text, Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ButtonImg, ButtonText } from '../../../components/basics/Buttons';
import PinchSelectionModal from '../../../components/gripChallenges/pinchSelection/PinchSelectionObsolete';
import Colors from '../../../constants/styles';
import { useUserContext } from '../../../contexts/UserContext';
import { Test } from '../test';
import GripSelectionScreen from './GripSelectionScreen';
import { CrimpSelectionScreen } from './Crimp/CrimpSelectionScreen';
import { DeadhangSelectionScreen } from './DeadHang/DeadhangSelectionScreen';
import { PinchSelectionScreen } from './Pinch/PinchSelectionScreen';
import PinchSelectionStack from './Pinch/PinchSelectionStack';

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
        options={{ title: 'My PinchSelectionScreen' }}
      />
      <Stack.Screen
        name="DeadhangSelectionScreen"
        component={DeadhangSelectionScreen}
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
    </Stack.Navigator>
  );
}

export default GripSelectionStack;
