import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { UserContext } from "../../tools/UserContext";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import { useUpdateUser } from "../../tools/hooks/useUpdateUser";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const ExpChange = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const details = route.params;
  const [leveledUp, setLeveledUp] = useState(false);

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
      console.log("This was hit");
      setLeveledUp(true);
      useUpdateUser("increaseLevel");
      // identifyNewLevel(levelToCheck + 1, newExp);
      // Need to decide late if this should be called recursively
    }
  };

  const nextLevelExp = Math.ceil(100 * userContext.level * 1.05);
  const initialBarLength = (details[0] / nextLevelExp) * 100;
  const testEndBarLength = ((details[1] + 1000) / nextLevelExp) * 100;
  // const initialBarLength = 20;
  // const testEndBarLength = 70;

  const barLength = useSharedValue(initialBarLength);

  const showProgress = useAnimatedStyle(() => {
    return {
      width: `${barLength.value}%`,
    };
  }, []);

  useEffect(() => {
    console.log("details", details);
    //identifyNewLevel(userContext.level, details[1]);
    barLength.value = withDelay(
      500,
      withTiming(testEndBarLength, { duration: 1500 })
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.levelLabel}>Level {userContext.level}</Text>
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
