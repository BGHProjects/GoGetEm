import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";

const Countdown = ({ navigation, route }: any) => {
  const totalDetails = route.params;
  const [countDown, setCountDown] = useState(3);
  const [go, setGo] = useState<string | number>(countDown);
  const [get, setGet] = useState<string | undefined>();
  const [em, setEm] = useState<string | undefined>();

  // Label variables
  const textOpacity = useSharedValue(0);
  const textYPos = useSharedValue(-10);
  const textXPos = useSharedValue(0);

  // For the other parts of the label
  const getOpacity = useSharedValue(0);
  const getYPos = useSharedValue(-10);
  const getXPos = useSharedValue(0);

  const emOpacity = useSharedValue(0);
  const emYPos = useSharedValue(-10);
  const emXPos = useSharedValue(0);

  const fillLogoDuration = 500;
  const opacityEntrance = 700;
  const dropEntrance = 900;

  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        { translateY: textYPos.value },
        { translateX: textXPos.value },
      ],
    };
  });

  const getAnimation = useAnimatedStyle(() => {
    return {
      opacity: getOpacity.value,
      transform: [{ translateY: getYPos.value }, { translateX: getXPos.value }],
    };
  });

  const emAnimation = useAnimatedStyle(() => {
    return {
      opacity: emOpacity.value,
      transform: [{ translateY: emYPos.value }, { translateX: emXPos.value }],
    };
  });

  const countDownEffect = () => {
    // Ensures both parts of the animation happen within one second
    textOpacity.value = withSequence(
      withTiming(1, { duration: opacityEntrance }),
      withTiming(0, { duration: 1000 - opacityEntrance })
    );

    textYPos.value = withSequence(
      withTiming(0, { duration: dropEntrance }),
      withTiming(-10, { duration: 1000 - dropEntrance })
    );

    setTimeout(() => {
      setCountDown((oldData) => oldData - 1);
    }, 1000);
  };

  // TODO Fix all of these magic numbers
  const goGetEm = () => {
    setGo("Go");
    textOpacity.value = withTiming(1, { duration: opacityEntrance });
    textYPos.value = withTiming(0, { duration: dropEntrance });

    setTimeout(() => {
      setGet("Get");
      getOpacity.value = withTiming(1, { duration: opacityEntrance });
      getYPos.value = withTiming(0, { duration: dropEntrance });
      textXPos.value = withTiming(-35, { duration: fillLogoDuration / 2 });
      getXPos.value = withTiming(25, { duration: fillLogoDuration / 2 });
    }, fillLogoDuration);

    setTimeout(() => {
      setEm("Em");
      emOpacity.value = withTiming(1, { duration: opacityEntrance });
      emYPos.value = withTiming(0, { duration: dropEntrance });
      textXPos.value = withTiming(-60, { duration: fillLogoDuration / 2 });
      getXPos.value = withTiming(0, { duration: fillLogoDuration / 2 });
      emXPos.value = withTiming(63, { duration: fillLogoDuration / 2 });
    }, fillLogoDuration * 2);

    setTimeout(() => {
      navigation.navigate(`${totalDetails.mode} Gameplay`, totalDetails);
    }, fillLogoDuration * 3.5);
  };

  useEffect(() => {
    if (countDown > 0) {
      countDownEffect();
    } else {
      goGetEm();
    }
  }, [countDown]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.label, textAnimation]}>
          {countDown > 0 ? countDown : go}
        </Animated.Text>
        <Animated.Text style={[styles.label, getAnimation]}>
          {get}
        </Animated.Text>
        <Animated.Text style={[styles.label, emAnimation]}>{em}</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryBackground,
  },
  label: {
    color: Colors.white,
    fontFamily: "Main-Bold",
    textAlign: "center",
    fontSize: 40,
    position: "absolute",
  },
  textContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100,
  },
});

export default Countdown;
