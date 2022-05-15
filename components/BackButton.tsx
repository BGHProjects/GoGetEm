import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { Screens } from "../constants/types";

const animValue = 500;

interface BackButtonProps {
  backToGameMenu?: boolean;
  delay?: number;
}

const BackButton = ({ backToGameMenu, delay = animValue }: BackButtonProps) => {
  const navigation = useNavigation();

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

  const navigationFunction = () => {
    if (backToGameMenu) {
      navigation.navigate(Screens.GameModes);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Animated.View style={[fadeStyle, styles.absoluteContainer]}>
      <AwesomeButton
        backgroundColor={Colors.buttonBackground}
        backgroundDarker={Colors.fluroBlue}
        borderColor={Colors.fluroBlue}
        borderWidth={1}
        height={40}
        width={60}
        borderRadius={10}
        raiseLevel={5}
        style={styles.awesomeButtonContainer}
        onPress={() => navigationFunction()}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color={"white"}
          style={{
            alignSelf: "center",
          }}
        />
      </AwesomeButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: { position: "absolute", top: 10, left: 40 },
  awesomeButtonContainer: {
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BackButton;
