import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Vibration } from "react-native";
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
import { Data, Mode, Screens } from "../../constants/types";
import { calculateBarPositions } from "./helpers/handleProgressBar";
import { BGColourOption } from "../../constants/gameConstants";
import Unlockables from "../../constants/Unlockables";
import { useIsFocused } from "@react-navigation/native";

const ExpChange = ({ navigation, route }: any) => {
  const userContext = useContext(UserContext);
  const prevExp = Math.round(route.params[0]);
  const newExp = Math.round(route.params[1]);
  const whichMode = route.params[2];
  const [leveledUp, setLeveledUp] = useState(false);
  const nextLevelExp = calcExpToNextLevel(userContext.level);
  const [levelLabel, setLevelLabel] = useState(userContext.level);
  const [newLevels, setNewLevels] = useState<any>([]);

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

    // Don't level up again if you are the maximum level
    if (userContext.level < Object.keys(Unlockables).length) {
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
    }
  };

  const handleLevelUp = () => {
    setNewLevels((oldArray: any[]) => [...oldArray, userContext.level + 1]);
    userContext.setLevel((old) => old + 1);
    updateStorageValue(Data.Level, 1);

    // Delays change to line up with animation
    setTimeout(() => {
      Vibration.vibrate(500);
      setLevelLabel((old) => old + 1);
    }, progressBarDuration + progressBarDelay);
  };

  useEffect(() => {
    if (userContext.level < Object.keys(Unlockables).length) {
      handleExpChange(
        prevExp,
        newExp,
        nextLevelExp,
        userContext.level,
        prevLevelExp
      );
    }
  }, []);

  const handleContinue = () => {
    if (leveledUp && userContext.level < Object.keys(Unlockables).length) {
      navigation.navigate(Screens.Unlocks, newLevels);
    } else {
      navigation.navigate(Screens.GameModes);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {userContext.level < Object.keys(Unlockables).length && (
        <>
          <Text style={styles.levelLabel}>Level {levelLabel}</Text>
          <View style={styles.barContainer}>
            <Animated.View style={[styles.progressBar, showProgress]} />
          </View>
        </>
      )}

      {userContext.level >= Object.keys(Unlockables).length && (
        <Text style={styles.levelLabel}>Maximum Level Reached</Text>
      )}

      <MenuButton text="Continue" operation={() => handleContinue()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: "100%",
    backgroundColor: Colors.fluroGreen,
    borderRadius: 5,
  },
  barContainer: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.white,
    height: 80,
    width: "80%",
    marginBottom: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryBackground,
  },
  levelLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 30,
    marginBottom: 30,
  },
});

export default ExpChange;
