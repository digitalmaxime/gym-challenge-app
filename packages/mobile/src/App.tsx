import React, { Component } from 'react';
import { useState, useEffect, useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import { onIdTokenChanged } from 'firebase/auth';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import Colors from './constants/styles';
import { UserProvider, useUserContext } from './contexts/UserContext';
import MainNavigation from './screens/MainAppScreens/MainNavigation';
import { auth } from './utils/auth';
import GripSelectionStack from './screens/MainAppScreens/Challenge/GripSelectionStack';
import { Test } from './screens/MainAppScreens/test';

// const mountSplashScreen = async () => {
//   try {
//     await SplashScreen.preventAutoHideAsync();
//   } catch (e) {
//     console.warn(e);
//   }
// };

// // Keep the splash screen visible while we fetch resources
// mountSplashScreen();

// const Stack = createNativeStackNavigator();

function Navigation() {
  const userContext = useUserContext();

  /** * Listen to firebase auth to set isLoggedIn conditional variable ** */
  // useEffect(() => {
  //   const listener = onIdTokenChanged(auth, async (user) => {
  //     setIsLoggedIn(!!user && user.emailVerified);
  //   });

  //   return () => {
  //     listener();
  //   };
  // }, []);

  return (
    <>
      <GripSelectionStack />
      {/* {(!isLoggedIn || !appContentReady) && ( */}
      {/* {(!appContentReady) && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      )} */}
      {/* {(appContentReady) && <MainNavigation />} */}
      {/* {(isLoggedIn && appContentReady) && <MainNavigation />} */}
    </>
  );
}

function Root() {
  return (
    <View style={{ flex: 1 }}>
      <MainNavigation />
    </View>
  );
}

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToastProvider offsetTop={60}>
        <UserProvider>
          <StatusBar
            backgroundColor={Colors.topNavBarColor}
            barStyle="light-content"
          />
          <Root />
        </UserProvider>
      </ToastProvider>
    </SafeAreaView>
  );
}

export default App;
