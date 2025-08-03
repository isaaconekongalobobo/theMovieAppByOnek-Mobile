import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Films from '../films';
import MovieDetail from './movieDetails';
const Stack = createNativeStackNavigator();

const FilmsStack = () => {
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
      <Stack.Screen name="FilmsHome" component={Films} options={{ title: 'Films' }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title: 'Détail du Film' }} />
    </Stack.Navigator>
  );
};

export default FilmsStack;
