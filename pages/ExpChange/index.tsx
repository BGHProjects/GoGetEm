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
import { progressBarDuration } from "../../constants/Animation";
import { updateStorageValue } from "../../tools/updateStorageValue";
import { Data } from "../../constants/types";

const ExpChange = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const details = route.params;
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

  // Adjusts calculations based on if the user is level 0
  function accountForLevel0(value: number) {
    if (userContext.level > 0) return value - prevLevelExp;
    return value;
  }

  // If the user is starting from 0, make the initial 0
  const initialBarLength =
    details[0] === 0
      ? 0
      : (accountForLevel0(details[0]) / accountForLevel0(nextLevelExp)) * 100;

  // If the newExp is more than the nextLevelExp, the bar will be filled 100%
  const endBarLength =
    nextLevelExp > details[1]
      ? (accountForLevel0(details[1]) / accountForLevel0(nextLevelExp)) * 100
      : 100;

  // Used for animations
  const barLength = useSharedValue(initialBarLength);
  const showProgress = useAnimatedStyle(() => {
    return {
      width: `${barLength.value}%`,
    };
  }, []);

  useEffect(() => {
    if (nextLevelExp <= details[1]) setLeveledUp(true);
    barLength.value = withDelay(
      500,
      withTiming(endBarLength, { duration: progressBarDuration })
    );
  }, []);

  useEffect(() => {
    if (leveledUp) {
      userContext.setLevel((old) => old + 1);
      updateStorageValue(Data.Level, 1);

      // Delays change to line up with animation
      setTimeout(() => {
        setLevelLabel((old) => old + 1);
      }, progressBarDuration + 500);
    }
  }, [leveledUp]);

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
