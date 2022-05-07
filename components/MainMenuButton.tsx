import React, { useEffect } from "react";
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
    if (isFocused) {
      buttonOpacity.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
      buttonScale.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
    }
  }, [isFocused]);

  const buttonOption: Record<MainMenuOption, any> = {
    [MainMenuOption.Play]: {
      colour: ColorGradients.green,
    },
    [MainMenuOption.Customise]: {
      colour: ColorGradients.fire,
    },
    [MainMenuOption.Statistics]: {
      colour: ColorGradients.purple,
    },
    [MainMenuOption.Credits]: {
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
