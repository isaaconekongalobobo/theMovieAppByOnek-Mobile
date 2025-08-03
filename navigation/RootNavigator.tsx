// navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import AuthStack from './authStack';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Connexion: undefined;
  Inscription: undefined;
  Tabs: undefined;
};


export default function RootNavigator() {
  return (
    <>
    {/* <StatusBar backgroundColor="#B31B1B"  /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Authentication'>
        <Stack.Screen name="Authentication" component={AuthStack} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>    
    </>
  );
}
