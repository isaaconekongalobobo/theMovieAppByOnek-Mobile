// navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import LoginPage from '../components/loginPage';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Connexion: undefined;
  Inscription: undefined;
  Tabs: undefined;
};


export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Connexion" component={LoginPage} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
