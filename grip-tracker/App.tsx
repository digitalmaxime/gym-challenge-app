import React, {  } from 'react';

import { SafeAreaView, StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import Colors from './src/constants/styles';
import { UserProvider } from './src/contexts/UserContext';
import Root from './src/screens/root';

// const mountSplashScreen = async () => {
//   try {
//     await SplashScreen.preventAutoHideAsync();
//   } catch (e) {
//     console.warn(e);
//   }
// };

// // Keep the splash screen visible while we fetch resources
// mountSplashScreen();

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
