import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../pages/Splash/SplashScreen";
import MainMenu from "../pages/MainMenu";
import ClassicConfigScreen from "../pages/ClassicMode/ClassicConfig";
import ClassicRolesScreen from "../pages/ClassicMode/ClassicRoles";
import ClassicGameplayScreen from "../pages/ClassicMode/ClassicGameplay";
import ChasedownConfigScreen from "../pages/ChasedownMode/ChasedownConfig";
import ChasedownRolesScreen from "../pages/ChasedownMode/ChasedownRoles";
import ChasedownGameplayScreen from "../pages/ChasedownMode/ChasedownGameplay";
import HuntConfig from "../pages/HuntMode/HuntConfig";
import HuntRoles from "../pages/HuntMode/HuntRoles";
import HuntGameplay from "../pages/HuntMode/HuntGameplay";
import TagTeamConfig from "../pages/TagTeamMode/TagTeamConfig";
import TagTeamRoles from "../pages/TagTeamMode/TagTeamRoles";
import TagTeamGameplay from "../pages/TagTeamMode/TagTeamGameplay";

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
      <Stack.Screen
        name="Hunt Config"
        component={HuntConfig}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Hunt Roles"
        component={HuntRoles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Hunt Gameplay"
        component={HuntGameplay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TagTeam Config"
        component={TagTeamConfig}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TagTeam Roles"
        component={TagTeamRoles}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TagTeam Gameplay"
        component={TagTeamGameplay}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
