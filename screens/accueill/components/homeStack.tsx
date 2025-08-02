import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueill from '../accueill';
import MovieDetail from 'screens/films/components/movieDetails';
import SerieDetails from 'screens/series/components/serieDetails';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
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
      <Stack.Screen name="Home" component={Accueill} options={{ title: 'The Movie App by Onek' }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title: 'Détail du Film' }} />
      <Stack.Screen name="SerieDetail" component={SerieDetails} options={{ title: 'Détail de la serie' }} />
    </Stack.Navigator>
    );
}

export default HomeStack;
