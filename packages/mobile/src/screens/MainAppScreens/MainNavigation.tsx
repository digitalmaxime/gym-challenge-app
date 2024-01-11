/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import PracticeScreen from './Practice/PracticeScreen';
import ProfileScreen from './Profile/ProfileScreen';
import CourseScreen from './Course/CourseNavigation';

// Styles
import Colors from '../../constants/styles';

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
          name="Course"
          component={CourseScreen}
          options={{
            tabBarLabel: 'Cours',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Practice"
          component={PracticeScreen}
          options={{
            tabBarLabel: 'Pratique',
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
