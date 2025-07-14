import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import Accueill from 'screens/accueill/accueill';
import Films from 'screens/films/films';
import Series from 'screens/series/series';
import Acteurs from 'screens/acteurs/acteurs';
import Me from 'screens/moi/me';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="connexion"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'Accueil':
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
            case 'Films':
              return <MaterialIcons name={focused ? 'movie' : 'movie'} size={size} color={color} />;
            case 'Séries':
              return <MaterialIcons name={focused ? 'live-tv' : 'live-tv'} size={size} color={color} />;
            case 'Acteurs':
              return <FontAwesome5 name={focused ? 'theater-masks' : 'theater-masks'} size={size} color={color} />;
            case 'Moi':
              return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Accueil" component={Accueill} />
      <Tab.Screen name="Films" component={Films} />
      <Tab.Screen name="Séries" component={Series} />
      <Tab.Screen name="Acteurs" component={Acteurs} />
      <Tab.Screen name="Moi" component={Me} />
    </Tab.Navigator>
  );
}
