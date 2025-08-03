import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Acteurs from '../acteurs';
import ActorDetails from './acteurDetails';
import MovieDetail from 'screens/films/components/movieDetails';
const Stack = createNativeStackNavigator();

const ActorStack = () => {
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
      <Stack.Screen name="ActeursHome" component={Acteurs} options={{ title: 'Acteurs' }} />
      <Stack.Screen name="ActorDetail" component={ActorDetails} options={{ title: "Détails sur l'acteur" }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title: 'Détail du Film' }} />
    </Stack.Navigator>
  );
}

export default ActorStack;
