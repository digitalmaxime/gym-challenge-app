import React, { useState, useEffect } from 'react';

function Root() {
  /** * Listen to firebase auth to set isLoggedIn conditional variable ** */
  console.log("--> ROOT : after setIsLoggedIn()")

  return (
    <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}

export default Root;