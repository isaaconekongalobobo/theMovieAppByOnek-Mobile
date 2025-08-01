import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueill from '../accueill';
import MovieDetail from 'screens/films/components/movieDetails';
import SerieDetails from 'screens/series/components/serieDetails';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Accueill} options={{ title: 'Films' }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title: 'Détail du Film' }} />
      <Stack.Screen name="SerieDetail" component={SerieDetails} options={{ title: 'Détail du Film' }} />
    </Stack.Navigator>
    );
}

export default HomeStack;
