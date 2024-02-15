import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Styles
import Colors from "../../constants/styles";
import ProfileScreen from "./profile/ProfileScreen";
import { Test } from "./training/test";
import GripChallengeSelectionStack from "./challenge/GripChallengeSelectionStack";
import AnalyticsScreen from "./analytics/AnalyticsScreen";

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Stats"
        activeColor={Colors.activeIcon}
        barStyle={styles.barStyle}
        inactiveColor={Colors.inactiveIcon}
        >
        <Tab.Screen
          name="Train"
          component={Test}
          options={{
            tabBarLabel: "Train",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
        />
        <Tab.Screen
          name="Challenge"
          component={GripChallengeSelectionStack}
          options={{
            tabBarLabel: "Challenge",
            tabBarIcon: ({ color,  }) => (
              <MaterialCommunityIcons name="arm-flex" color={color} size={26} />
            ),
          }}
        />
          <Tab.Screen
            name="Stats"
            component={AnalyticsScreen}
            options={{
              tabBarLabel: "Stats",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-timeline-variant-shimmer" color={color} size={26} />
                // chart-bell-curve-cumulative chart-line chart-timeline-variant-shimmer
              ),
            }}
          />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
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
    height: 80,
    padding: 5,
  },
});
