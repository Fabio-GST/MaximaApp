import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../login/LoginScreen';
import TabNavigator from './TabNavigator';
import { getUser } from '../controllers/UsuarioController';
import VideoListScreen from '../Screens/Home/videoListScreen';
import { HeaderBackButton } from '@react-navigation/stack';



const Stack = createStackNavigator();

const Navigation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserStatus = async () => {
            const user = await getUser();
            if (user) {
                setIsUserLoggedIn(true);
            }
            setIsLoading(false);
        };

        checkUserStatus();
    }, []);

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isUserLoggedIn ? "Main" : "Login"}>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VideoListScreen"
                    component={VideoListScreen}
                    options={{ headerShown: false }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
