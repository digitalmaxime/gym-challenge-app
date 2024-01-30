import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/AuthScreens/Login';
import SignUp from './screens/AuthScreens/SignUp';
import { auth } from './utils/firebase';
import MainNavigation from './screens/MainScreens/MainNavigation';
import { onIdTokenChanged } from 'firebase/auth';

export default function Root() {
  /** * Listen to firebase auth to set isLoggedIn conditional variable ** */
  // console.log("--> ROOT : after setIsLoggedIn()")
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  useEffect(() => {
    const listener = onIdTokenChanged(auth, async user => {
      setIsLoggedIn(!!user && user.emailVerified);
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <>
      {(!isLoggedIn) && (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {isLoggedIn && <MainNavigation />}
    </>
  );
}
