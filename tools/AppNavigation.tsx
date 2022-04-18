import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "../pages/MainMenu";
import GameModes from "../pages/GameModes";
import ClassicRolesScreen from "../pages/ClassicMode/ClassicRoles";
import ClassicGameplayScreen from "../pages/ClassicMode/ClassicGameplay";
import ChasedownRolesScreen from "../pages/ChasedownMode/ChasedownRoles";
import ChasedownGameplayScreen from "../pages/ChasedownMode/ChasedownGameplay";
import HuntRoles from "../pages/HuntMode/HuntRoles";
import HuntGameplay from "../pages/HuntMode/HuntGameplay";
import TagTeamRoles from "../pages/TagTeamMode/TagTeamRoles";
import TagTeamGameplay from "../pages/TagTeamMode/TagTeamGameplay";
import Preparation from "../pages/Preparation/";
import Statistics from "../pages/Statistics";
import ConfigScreen from "../pages/Config";
import Customise from "../pages/Customise";
import Credits from "../pages/Credits";
import EndGame from "../pages/EndGame";
import ExpChange from "../pages/ExpChange";
import Unlocks from "../pages/Unlocks";

const AppNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Main Menu" screenOptions={{}}>
      {/* 
      // TODO Eliminate this dude
      <Stack.Screen
        name="Preparation"
        component={Preparation}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Main Menu"
        component={MainMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game Modes"
        component={GameModes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Classic Roles"
        component={ClassicRolesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Classic Gameplay"
        component={ClassicGameplayScreen}
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
        name="TagTeam Roles"
        component={TagTeamRoles}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TagTeam Gameplay"
        component={TagTeamGameplay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Customise"
        component={Customise}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Credits"
        component={Credits}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="End Game"
        component={EndGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpChange"
        component={ExpChange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Unlocks"
        component={Unlocks}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
