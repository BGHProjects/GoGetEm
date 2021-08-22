import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from "../pages/Splash/SplashScreen";
import MainMenu from "../pages/MainMenu/MainMenuScreen";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AppNavigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
            
        }}>
            <Stack.Screen 
            name="Splash"
            component={Splash}
            options={{
            }}/>
             <Stack.Screen 
            name="Main Menu"
            component={MainMenu}/>
        </Stack.Navigator>
    );
};

export default AppNavigation;