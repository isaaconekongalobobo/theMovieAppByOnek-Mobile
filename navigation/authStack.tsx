import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from 'screens/authentification/loginPage';
import React from 'react';
import SinginPage from 'screens/authentification/SinginPage';
import { StatusBar } from 'react-native';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <>
            <StatusBar backgroundColor="#FF0800" barStyle="light-content" />
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={LoginPage}/>
                <Stack.Screen name='Signin' component={SinginPage}/>
            </Stack.Navigator>        
        </>
    );
}

export default AuthStack;
