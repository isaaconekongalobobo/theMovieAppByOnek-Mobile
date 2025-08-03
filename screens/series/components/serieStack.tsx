import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Series from '../series';
import SerieDetails from './serieDetails';
const Stack = createNativeStackNavigator();

const SerieStack = () => {
  return (
    <Stack.Navigator 
      screenOptions= {{ 
        headerShown: true, 
        headerStyle: {
          backgroundColor: '#FF0800',
        },
        headerTitleStyle: {
          color: '#F0F8FF',
          fontWeight: 'bold',
          fontSize: 20
        }
      }}>
      <Stack.Screen name="SériesHome" component={Series} options={{ title: 'Séries' }} />
      <Stack.Screen name="SerieDetail" component={SerieDetails} options={{ title: 'Détails de la série' }} />
    </Stack.Navigator>
  );
}

export default SerieStack;
