import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { CrimpSelectionScreen } from './CrimpSelectionScreen';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CrimpSelectionStackProps {}

const CrimpSelectionStack = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="CrimpSelectionScreen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CrimpSelectionScreen"
        component={CrimpSelectionScreen}
        options={{ title: 'My CrimpSelectionScreen' }}
      />

    </Stack.Navigator>
  );
};

export default CrimpSelectionStack;

const styles = StyleSheet.create({
  container: {}
});
