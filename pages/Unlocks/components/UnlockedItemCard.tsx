import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { Backgrounds } from "../../../constants/Images";
import determineDetails from "../helpers/determineDetails";
import Selection from "../../../components/Selection";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

interface UnlockedItemCardProps {
  item: string;
  delay: number;
}

const animationDuration = 400;

const UnlockedItemCard = ({ item, delay }: UnlockedItemCardProps) => {
  const { colourUsed, label } = determineDetails(item);
  const isFocused = useIsFocused();
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.7);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [{ scale: cardScale.value }],
    };
  }, []);

  useEffect(() => {
    cardOpacity.value = 0;
    cardScale.value = 0.7;
    if (isFocused) {
      cardOpacity.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
      cardScale.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        fadeStyle,
        styles.optionContainer,
        {
          borderColor: colourUsed,
        },
      ]}
    >
      {/**
       * Displays either a background image or controller/outline option
       * depending on what has been unlocked
       */}
      <View style={styles.previewContainer}>
        {item.split("-")[0] === "background" ? (
          <ImageBackground
            source={Backgrounds[item.split("-")[1] as keyof typeof Backgrounds]}
            style={styles.bgImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.buttonOptionOuterContainer}>
            <View style={styles.buttonOptionInnerContainer}>
              <Selection variant={item} />
            </View>
          </View>
        )}
      </View>
      <View style={styles.labelContainer}>
        <View style={{ width: "80%" }}>
          <Text style={styles.itemLabel}>{label}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bgImage: { width: "99%", height: "99%" },
  buttonOptionOuterContainer: { width: 50, height: 50, position: "relative" },
  buttonOptionInnerContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -4,
  },
  previewContainer: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  labelContainer: {
    height: "100%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  optionContainer: {
    width: "80%",
    height: 60,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  itemLabel: {
    color: "white",
    fontSize: 12,
    fontFamily: "Main-Bold",
    marginTop: -5,
    textAlign: "center",
  },
});

export default UnlockedItemCard;
