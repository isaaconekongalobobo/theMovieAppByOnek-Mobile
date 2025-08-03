import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import Acteurs from 'screens/acteurs/acteurs';
import Me from 'screens/moi/me';
import FilmsStack from 'screens/films/components/filmsStack';
import HomeStack from 'screens/accueill/components/homeStack';
import { StatusBar } from 'react-native';
import SerieStack from 'screens/series/components/serieStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <>
      <StatusBar backgroundColor="#FF0800" barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="Accueil"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF0800',
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
          tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0 },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Films" component={FilmsStack} />
        <Tab.Screen name="Séries" component={SerieStack} />
        <Tab.Screen name="Acteurs" component={Acteurs} />
        <Tab.Screen name="Moi" component={Me} />
      </Tab.Navigator>    
    </>
  );
}
