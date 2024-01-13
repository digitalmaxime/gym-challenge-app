/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import GripSelectionScreen from './Challenge/GripSelectionScreen';
import ProfileScreen from './Profile/ProfileScreen';

// Styles
import Colors from '../../constants/styles';
import { Test } from './test';
import GripSelectionStack from './Challenge/GripSelectionStack';

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="login"
        activeColor={Colors.activeIcon}
        barStyle={styles.barStyle}
      >
        <Tab.Screen
          name="Train"
          component={Test}
          options={{
            tabBarLabel: 'Train',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Challenge"
          component={GripSelectionStack}
          options={{
            tabBarLabel: 'Challenge',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="arm-flex" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  barStyle: {
    backgroundColor: Colors.bottomNavBarColor,
    height: 60,
    borderTopWidth: 2,
    borderColor: Colors.bottomBorderSeparator,
  },
});
