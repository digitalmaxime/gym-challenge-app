import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { DeadhangSelectionScreen } from './DeadhangSelectionScreen';
import DeadhangChallenge from './DeadhangChallenge';


const DeadhangSelectionStack = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="DeadhangSelectionScreen"
      screenOptions={{
        headerTintColor: 'white',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DeadhangSelectionScreen"
        component={DeadhangSelectionScreen}
        />
      <Stack.Screen
        name="DeadhangChallenge"
        component={DeadhangChallenge}
      />

    </Stack.Navigator>
  );
};

export default DeadhangSelectionStack;

const styles = StyleSheet.create({
  container: {}
});
