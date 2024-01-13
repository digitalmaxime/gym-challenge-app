/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Image, View, Text, Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ButtonImg, ButtonText } from '../../../components/basics/Buttons';
import PinchSelectionModal from '../../../components/gripChallenges/pinchSelection/PinchSelection';
import Colors from '../../../constants/styles';
import { useUserContext } from '../../../contexts/UserContext';
import { Test } from '../test';
import GripSelectionScreen from './GripSelectionScreen';
import { CrimpSelectionScreen } from './CrimpSelectionScreen';
import { DeadhangSelectionScreen } from './DeadhangSelectionScreen';
import { PinchSelectionScreen } from './PinchSelectionScreen';
import PinchSelectionStack from './PinchSelectionStack';

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
    // <Stack.Navigator screenOptions={{ headerShown: true }}>
    //   <Stack.Screen
    //     name="SearchCoursesScreen"
    //     component={Test}
    //     options={{ title: 'Recherche', headerBackButtonMenuEnabled: true }}
    //   />
    //   <Stack.Screen
    //     name="CourseLearning"
    //     component={PinchScreen}
    //     options={{ title: 'Apprentissage', header: () => null }}
    //   />
    // </Stack.Navigator>
  );
}

export default GripSelectionStack;
