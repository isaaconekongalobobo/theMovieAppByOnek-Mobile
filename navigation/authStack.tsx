import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from 'screens/authentification/loginPage';
import React from 'react';
import SinginPage from 'screens/authentification/SinginPage';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginPage}/>
            <Stack.Screen name='Signin' component={SinginPage}/>
        </Stack.Navigator>
    );
}

export default AuthStack;
