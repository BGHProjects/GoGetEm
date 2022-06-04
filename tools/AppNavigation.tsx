import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "../pages/MainMenu";
import ClassicRolesScreen from "../pages/ClassicMode/ClassicRoles";
import ClassicGameplayScreen from "../pages/ClassicMode/ClassicGameplay";
import ChasedownRolesScreen from "../pages/ChasedownMode/ChasedownRoles";
import ChasedownGameplayScreen from "../pages/ChasedownMode/ChasedownGameplay";
import HuntRoles from "../pages/HuntMode/HuntRoles";
import HuntGameplay from "../pages/HuntMode/HuntGameplay";
import TagTeamRoles from "../pages/TagTeamMode/TagTeamRoles";
import TagTeamGameplay from "../pages/TagTeamMode/TagTeamGameplay";
import Statistics from "../pages/Statistics";
import ConfigScreen from "../pages/Config";
import Customise from "../pages/Customise";
import EndGame from "../pages/EndGame";
import ExpChange from "../pages/ExpChange";
import Unlocks from "../pages/Unlocks";
import Countdown from "../pages/Countdown";
import GameModes from "../pages/GameModes";
import { Screens } from "../constants/types";
import { BackHandler } from "react-native";

const AppNavigation = () => {
  const Stack = createStackNavigator();

  // Removes functionality of android back button
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  return (
    <Stack.Navigator initialRouteName={Screens.MainMenu} screenOptions={{}}>
      <Stack.Screen
        name={Screens.MainMenu}
        component={MainMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.GameModes}
        component={GameModes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ClassicRoles}
        component={ClassicRolesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ClassicGameplay}
        component={ClassicGameplayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ChasedownRoles}
        component={ChasedownRolesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ChasedownGameplay}
        component={ChasedownGameplayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.HuntRoles}
        component={HuntRoles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.HuntGameplay}
        component={HuntGameplay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.TagTeamRoles}
        component={TagTeamRoles}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Screens.TagTeamGameplay}
        component={TagTeamGameplay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Statistics}
        component={Statistics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Config}
        component={ConfigScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Customise}
        component={Customise}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.EndGame}
        component={EndGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ExpChange}
        component={ExpChange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Unlocks}
        component={Unlocks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Countdown}
        component={Countdown}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
