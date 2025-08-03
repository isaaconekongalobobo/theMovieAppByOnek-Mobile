import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Music from '../music';
const Stack = createNativeStackNavigator();

const MusicStack = () => {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#FF0800',
                },
                headerTitleStyle: {
                    color: '#F0F8FF',
                    fontWeight: 'bold',
                    fontSize: 20
                },
            }}>
            <Stack.Screen name='Musiques' component={Music} options={{ title: 'Musiques' }} />
        </Stack.Navigator>
    );
}

export default MusicStack;
