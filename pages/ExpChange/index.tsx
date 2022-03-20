import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  ReactElement,
} from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { UserContext, userReducer } from "../../tools/UserContext";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import { useUpdateUser } from "../../tools/hooks/useUpdateUser";
import { handlePostGame } from "./helpers/handlePostGame";

const ExpChange = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const details = route.params;

  // Handle how many times the user levelled up
  /**
   * Flow of function
   *    Calculate total exp required for level after user's current level
   *        If user's new exp is greater than this total:
   *            increase user's level
   *            Repeat step 1, with an incremented level
   *        Else:
   *            break out of loop
   */

  const identifyNewLevel = (levelToCheck: number, newExp: number) => {
    let baseX = 100;
    let exponent = 1.05;

    let nextLevelExp = Math.ceil(baseX * levelToCheck ** exponent);
    console.log("newExp", newExp);
    console.log("nextLevelExp", nextLevelExp);
    if (nextLevelExp < newExp) {
      useUpdateUser("increaseLevel");
      identifyNewLevel(levelToCheck + 1, newExp);
    }
  };

  // This will be called in the previous screen and transferred over
  // handlePostGame(userContext.totalExp, gameDetails);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: "white",
          fontFamily: "Main-Bold",
          fontSize: 30,
          marginBottom: 30,
        }}
      >
        Level {userContext.level}
      </Text>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 5,
          borderColor: Colors.fluroPink,
          height: 80,
          width: "80%",
          marginBottom: 50,
        }}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: Colors.fluroBlue,
            width: `${details[1]}%`,
          }}
        />
      </View>
      <MenuButton
        text="Continue"
        shadowColour="red"
        operation={() => navigation.navigate("Game Modes")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExpChange;
