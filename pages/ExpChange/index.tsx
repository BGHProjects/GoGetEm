import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserContext } from "../../tools/UserContext";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { calcExpToNextLevel } from "../../tools/calcNextLevelExp";
import {
  progressBarDuration,
  progressBarDelay,
} from "../../constants/Animation";
import { updateStorageValue } from "../../tools/updateStorageValue";
import { Data } from "../../constants/types";
import { calculateBarPositions } from "./helpers/handleProgressBar";

const ExpChange = ({ navigation, route }: any) => {
  const userContext = useContext(UserContext);
  const prevExp = route.params[0];
  const newExp = route.params[1];
  const [leveledUp, setLeveledUp] = useState(false);
  const nextLevelExp = calcExpToNextLevel(userContext.level);
  const [levelLabel, setLevelLabel] = useState(userContext.level);

  /**
   * This value is used to normalize the exp
   * so that the progression is based on the current level and the next level
   * and not just the user's total exp until the exp required for the next level
   */
  const prevLevelExp =
    userContext.level > 0 ? calcExpToNextLevel(userContext.level - 1) : 100;

  // Needs to be set initially and be accessible by the return function below
  const barLength = useSharedValue(0);

  // Used for animations
  const showProgress = useAnimatedStyle(() => {
    return {
      width: `${barLength.value}%`,
    };
  }, []);

  const handleExpChange = (
    prevExp: number,
    newExp: number,
    nextLevelExp: number,
    userLevel: number,
    prevLevelExp: number
  ) => {
    const { initialBarLength, endBarLength } = calculateBarPositions(
      prevExp,
      newExp,
      nextLevelExp,
      userLevel,
      prevLevelExp
    );

    barLength.value = initialBarLength;

    barLength.value = withDelay(
      progressBarDelay,
      withTiming(endBarLength, { duration: progressBarDuration })
    );

    if (nextLevelExp > newExp) return;

    // This just handles which page is navigated to next
    setLeveledUp(true);

    handleLevelUp();

    // This is so the animation lines up with the calculation
    setTimeout(() => {
      // Prepping new values for recursive call for next level
      const overFlowExp = newExp;
      const newPrevExp = nextLevelExp;
      const newUserLevel = userLevel + 1;
      const newNextLevelExp = calcExpToNextLevel(newUserLevel);
      const newPrevLevelExp = calcExpToNextLevel(userLevel);

      handleExpChange(
        newPrevExp,
        overFlowExp,
        newNextLevelExp,
        newUserLevel,
        newPrevLevelExp
      );
    }, progressBarDuration + progressBarDelay * 2);
  };

  const handleLevelUp = () => {
    userContext.setLevel((old) => old + 1);
    updateStorageValue(Data.Level, 1);

    // Delays change to line up with animation
    setTimeout(() => {
      setLevelLabel((old) => old + 1);
    }, progressBarDuration + progressBarDelay);
  };

  useEffect(() => {
    handleExpChange(
      prevExp,
      newExp,
      nextLevelExp,
      userContext.level,
      prevLevelExp
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.levelLabel}>Level {levelLabel}</Text>
      <View style={styles.barContainer}>
        <Animated.View style={[styles.progressBar, showProgress]} />
      </View>
      <MenuButton
        text="Continue"
        shadowColour="red"
        operation={() =>
          navigation.navigate(leveledUp ? "Unlocks" : "Game Modes")
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: "100%",
    backgroundColor: Colors.fluroBlue,
    borderRadius: 5,
  },
  barContainer: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.fluroPink,
    height: 80,
    width: "80%",
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  levelLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 30,
    marginBottom: 30,
  },
});

export default ExpChange;
