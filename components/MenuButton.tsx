import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import AwesomeButton from "react-native-really-awesome-button";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

interface MenuButtonProps {
  text: string;
  operation: () => void;
  delay?: number;
}

const animValue = 500;

const MenuButton = ({
  text,
  operation,
  delay = animValue,
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
        withTiming(1, { duration: animValue })
      );
      buttonScale.value = withDelay(
        delay,
        withTiming(1, { duration: animValue })
      );
    }
  }, [isFocused]);

  return (
    <Animated.View style={fadeStyle}>
      <AwesomeButton
        backgroundColor={Colors.buttonBackground}
        backgroundDarker={Colors.fluroBlue}
        width={230}
        borderRadius={10}
        borderColor={Colors.fluroBlue}
        borderWidth={1}
        onPress={operation}
        raiseLevel={5}
        style={styles.awesomeButtonContainer}
      >
        <View style={styles.textContainer}>
          <AutoSizeText
            fontSize={24}
            numberOfLines={2}
            mode={ResizeTextMode.max_lines}
            style={styles.label}
          >
            {text}
          </AutoSizeText>
        </View>
      </AwesomeButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  awesomeButtonContainer: { alignSelf: "center", marginTop: 20 },
  textContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "white",
    fontFamily: "Main",
    textAlign: "center",
  },
});

export default MenuButton;
