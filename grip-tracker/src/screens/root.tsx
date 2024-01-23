import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onIdTokenChanged } from 'firebase/auth';
import MainNavigation from './MainAppScreens/MainNavigation';
import { auth } from '../utils/auth'
import Login from './AuthScreens/Login';
import SignUp from './AuthScreens/SignUp'

// const mountSplashScreen = async () => {
//   try {
//     await SplashScreen.preventAutoHideAsync();
//   } catch (e) {
//     console.warn(e);
//   }
// };

// // Keep the splash screen visible while we fetch resources
// mountSplashScreen();

function Root() {
  /** * Listen to firebase auth to set isLoggedIn conditional variable ** */
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  console.log("--> ROOT : after setIsLoggedIn()")

  useEffect(() => {
    const listener = onIdTokenChanged(auth, async user => {
      setIsLoggedIn(!!user && user.emailVerified);
    });

    return () => {
      listener();
    };
  }, []);

  const Stack = createNativeStackNavigator();

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
    // <View style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     <Stack.Navigator screenOptions={{ headerShown: false }}>
    //       <Stack.Screen name="Login" component={Login} />
    //       <Stack.Screen name="SignUp" component={SignUp} />
    //       <Stack.Screen name="MainNavigation" component={MainNavigation} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </View>
  );
}

export default Root;