import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CourseDetailsScreen from './CourseDetailsScreen';
import CourseLearning from './CourseLearningScreen';
import SearchCoursesScreen from './SearchCoursesScreen';
import HintScreen from './HintScreen';

const Stack = createNativeStackNavigator();

function CourseScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="CourseLearning"
        component={CourseLearning}
        options={{ title: 'Apprentissage', header: () => null }}
      />
      <Stack.Screen
        name="SearchCoursesScreen"
        component={SearchCoursesScreen}
        options={{ title: 'Recherche' }}
      />
      <Stack.Screen
        name="CourseDetailsScreen"
        component={CourseDetailsScreen}
        options={{ title: 'Détails du cours' }}
      />
      <Stack.Screen
        name="HintScreen"
        component={HintScreen}
        options={{ title: 'Astuces' }}
      />
    </Stack.Navigator>
  );
}

export default CourseScreen;
