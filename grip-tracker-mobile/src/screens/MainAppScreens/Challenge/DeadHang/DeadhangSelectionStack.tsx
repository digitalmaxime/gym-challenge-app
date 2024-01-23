import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { DeadhangSelectionScreen } from './DeadhangSelectionScreen';
import DeadhangChallenge from './DeadhangChallenge';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeadhangSelectionStackProps {}

const DeadhangSelectionStack = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="DeadhangSelectionScreen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DeadhangSelectionScreen"
        component={DeadhangSelectionScreen}
        options={{ title: 'My DeadhangSelectionScreen' }}
      />
      <Stack.Screen
        name="DeadhangChallenge"
        component={DeadhangChallenge}
        options={{ title: 'Awesome DeadhangChallenge', presentation: 'modal' }}
      />

    </Stack.Navigator>
  );
};

export default DeadhangSelectionStack;

const styles = StyleSheet.create({
  container: {}
});
