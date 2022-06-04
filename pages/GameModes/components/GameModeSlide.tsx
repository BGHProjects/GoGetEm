import { Colors } from "../../../constants/Colors";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ControlsContent from "./ControlsContent";
import ClassicContent from "./ClassicContent";
import ChasedownContent from "./ChasedownContent";
import HuntContent from "./HuntContent";
import TagTeamContent from "./TagTeamContent";
import MenuButton from "../../../components/MenuButton";
import { Mode } from "../../../constants/types";
import BackButton from "../../../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Logos } from "../../../constants/Images";
import { useIsFocused } from "@react-navigation/native";
import { isUndefined } from "lodash";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const imgSize = 80;
const animValue = 500;

const GameModeSlide = ({
  navigation,
  slide: { color, title, description, image },
  index,
}: any) => {
  const whichComponent: Record<string, React.ReactNode> = {
    Controls: <ControlsContent />,
    Classic: <ClassicContent />,
    Chasedown: <ChasedownContent />,
    Hunt: <HuntContent />,
    TagTeam: <TagTeamContent />,
  };

  const onPressButton = (gameMode: string) => {
    navigation.navigate("Config", Mode[gameMode as Mode]);
  };

  const isFocused = useIsFocused();

  const contentOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.7);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ scale: contentScale.value }],
    };
  }, []);

  useEffect(() => {
    contentOpacity.value = 0;
    contentScale.value = 0.7;
    if (isFocused && !isUndefined(index)) {
      contentOpacity.value = withTiming(1, { duration: animValue });
      contentScale.value = withTiming(1, { duration: animValue });
    }
  }, [isFocused, index]);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {isFocused && !isUndefined(index) ? (
        <>
          <BackButton />
          <Animated.View style={fadeStyle}>
            {image !== "questionMark" ? (
              <Image
                style={styles.logoImage}
                source={Logos[image as keyof typeof Logos]}
              />
            ) : (
              <Ionicons
                name="help"
                size={imgSize}
                color={Colors.white}
                style={styles.questionMark}
              />
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </Animated.View>
          <View style={{ marginVertical: 20 }}>{whichComponent[title]}</View>
          {title !== "Controls" && (
            <View style={styles.menuButtonContainer}>
              <MenuButton
                text="Start"
                operation={() => onPressButton(title)}
                // TODO Make these not magic numbers
                delay={index === 0 ? 1000 : 2000}
              />
            </View>
          )}
        </>
      ) : (
        <>
          {/**
           * Don't display any content to relieve the processer
           */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 125,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Main-Bold",
  },
  description: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontFamily: "Main",
  },
  logoImage: {
    height: imgSize,
    width: imgSize,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: -50,
  },
  questionMark: {
    alignSelf: "center",
    marginTop: -50,
  },
  menuButtonContainer: { position: "absolute", bottom: 60 },
});

export default GameModeSlide;
