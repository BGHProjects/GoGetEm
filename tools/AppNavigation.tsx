import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../pages/Splash/SplashScreen";
import MainMenu from "../pages/MainMenu/MainMenuScreen";
import ClassicConfigScreen from "../pages/ClassicMode/ClassicConfig/ClassicConfigScreen";
import ClassicRolesScreen from "../pages/ClassicMode/ClassicRoles/ClassicRolesScreen";
import ClassicGameplayScreen from "../pages/ClassicMode/ClassicGameplay/ClassicGameplayScreen";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

const AppNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{}}>
      <Stack.Screen name="Splash" component={Splash} options={{}} />
      <Stack.Screen
        name="Main Menu"
        component={MainMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Classic Config"
        component={ClassicConfigScreen}
        options={{}}
      />
      <Stack.Screen
        name="Classic Roles"
        component={ClassicRolesScreen}
        options={{}}
      />
      <Stack.Screen
        name="Classic Gameplay"
        component={ClassicGameplayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
