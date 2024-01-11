import React, { useCallback, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import { onIdTokenChanged } from 'firebase/auth';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { CoursesProvider, useCoursesContext } from './contexts/CoursesContext';
import Login from './screens/AuthScreens/Login';
import SignUp from './screens/AuthScreens/SignUp';
import Colors from './constants/styles';
import { UserProvider, useUserContext } from './contexts/UserContext';
import MainNavigation from './screens/MainAppScreens/MainNavigation';
import { auth } from './utils/auth';

const mountSplashScreen = async () => {
  try {
    await SplashScreen.preventAutoHideAsync();
  } catch (e) {
    console.warn(e);
  }
};

// Keep the splash screen visible while we fetch resources
mountSplashScreen();

const Stack = createNativeStackNavigator();

function Navigation() {
  const userContext = useUserContext();
  const coursesContext = useCoursesContext();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  const [appContentReady, setAppContentReady] = useState(false);

  /** * Listen to firebase auth to set isLoggedIn conditional variable ** */
  useEffect(() => {
    const listener = onIdTokenChanged(auth, async (user) => {
      setIsLoggedIn(!!user && user.emailVerified);
    });

    return () => {
      listener();
    };
  }, []);

  /** * Listen to userContext to check if init is completed ** */
  useEffect(() => {
    if (
      userContext?.userData?.id === auth.currentUser?.uid &&
      coursesContext.courseReady
    ) {
      setAppContentReady(true);
    } else {
      setAppContentReady(false);
    }
  }, [coursesContext.courseReady, userContext?.userData]);

  return (
    <>
      {(!isLoggedIn || !appContentReady) && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      )}
      {(isLoggedIn && appContentReady) && <MainNavigation />}
    </>
  );
}

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  } return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToastProvider offsetTop={60}>
        <UserProvider>
          <CoursesProvider>
            <StatusBar
              backgroundColor={Colors.topNavBarColor}
              barStyle="light-content"
            />
            <Root />
          </CoursesProvider>
        </UserProvider>
      </ToastProvider>
    </SafeAreaView>
  );
}

export default App;
