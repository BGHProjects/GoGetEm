import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ColorGradients, XYEnd, XYStart } from "../constants/Colors";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { MainMenuOption } from "../constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MenuButtonProps {
  text: string;
  operation: () => void;
  menuOption: MainMenuOption;
  delay: number;
}

const width = Dimensions.get("window").width;
const animationDuration = 300;

const MainMenuButton = ({
  text,
  operation,
  menuOption,
  delay,
}: MenuButtonProps) => {
  const isFocused = useIsFocused();
  const [appHasLoaded, setAppHasLoaded] = useState(false);
  // Handles the initial animation when the app loads for the first time
  const [initialDelay, setInitialDelay] = useState(1200);

  async function getLoadingStatus() {
    const status = await AsyncStorage.getItem("Loaded");
    if (status === "true") {
      setAppHasLoaded(true);
    }
  }

  useEffect(() => {
    getLoadingStatus();
  }, [AsyncStorage]);

  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.7);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{ scale: buttonScale.value }],
    };
  }, []);

  useEffect(() => {
    buttonOpacity.value = 0;
    buttonScale.value = 0.7;
    if (isFocused && appHasLoaded) {
      setTimeout(() => {
        buttonOpacity.value = withDelay(
          delay,
          withTiming(1, { duration: animationDuration })
        );
        buttonScale.value = withDelay(
          delay,
          withTiming(1, { duration: animationDuration })
        );
        /**
         * When the app loads the first time, the initial loading bounce takes 1000 ms
         * so this is what the initialDelay is for
         * Once the app has loaded, we shouldn't delay the user if they navigate back
         * to the main menu, so we set this delay to 0
         */
        setInitialDelay(0);
      }, initialDelay);
    }
  }, [isFocused, appHasLoaded]);

  const buttonOption: Record<MainMenuOption, any> = {
    [MainMenuOption.Play]: {
      colour: ColorGradients.fire,
    },
    [MainMenuOption.Customise]: {
      colour: ColorGradients.purple,
    },
    [MainMenuOption.Statistics]: {
      colour: ColorGradients.ice,
    },
  };

  return (
    <TouchableOpacity onPress={operation}>
      <Animated.View style={fadeStyle}>
        <LinearGradient
          style={styles.gradient}
          start={XYStart}
          end={XYEnd}
          colors={buttonOption[menuOption].colour}
        >
          <View style={styles.textContainer}>
            <AutoSizeText
              fontSize={30}
              numberOfLines={2}
              mode={ResizeTextMode.max_lines}
              style={styles.label}
            >
              {text}
            </AutoSizeText>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  label: {
    color: "white",
    fontFamily: "Main-Bold",
    textAlign: "center",
    opacity: 1,
  },
  gradient: {
    height: 80,
    width: width * 0.8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    marginBottom: 20,
  },
});

export default MainMenuButton;
