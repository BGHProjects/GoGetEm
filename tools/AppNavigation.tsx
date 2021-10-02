import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../pages/Splash/SplashScreen";
import MainMenu from "../pages/MainMenu/MainMenuScreen";
import ClassicConfigScreen from "../pages/ClassicMode/ClassicConfig/ClassicConfigScreen";
import ClassicRolesScreen from "../pages/ClassicMode/ClassicRoles/ClassicRolesScreen";
import ClassicGameplayScreen from "../pages/ClassicMode/ClassicGameplay/ClassicGameplayScreen";
import ChasedownConfigScreen from "../pages/ChasedownMode/ChasedownConfig/ChasedownConfigScreen";
import ChasedownRolesScreen from "../pages/ChasedownMode/ChasedownRoles/ChasedownRolesScreen";
import ChasedownGameplayScreen from "../pages/ChasedownMode/ChasedownGameplay/ChasedownGameplayScreen";

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
      <Stack.Screen
        name="Chasedown Config"
        component={ChasedownConfigScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chasedown Roles"
        component={ChasedownRolesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chasedown Gameplay"
        component={ChasedownGameplayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
