import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
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

interface ModalButtonProps {
  text: string;
  operation: () => void;
}

const animValue = 500;

const ModalButton = ({ text, operation }: ModalButtonProps) => {
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
        animValue,
        withTiming(1, { duration: animValue })
      );
      buttonScale.value = withDelay(
        animValue,
        withTiming(1, { duration: animValue })
      );
    }
  }, [isFocused]);
  return (
    <Animated.View style={fadeStyle}>
      <AwesomeButton
        backgroundColor={Colors.buttonBackground}
        backgroundDarker={Colors.fluroBlue}
        width={200}
        borderRadius={10}
        borderWidth={1}
        borderColor={Colors.fluroBlue}
        onPress={operation}
        raiseLevel={5}
        style={{ alignSelf: "center" }}
      >
        <View style={styles.textContainer}>
          <AutoSizeText
            fontSize={18}
            numberOfLines={1}
            mode={ResizeTextMode.max_lines}
            style={styles.text}
          >
            {text}
          </AutoSizeText>
        </View>
      </AwesomeButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Main",
    textAlign: "center",
  },
  textContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalButton;
