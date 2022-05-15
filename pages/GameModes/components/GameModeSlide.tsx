import { Colors } from "../../../constants/Colors";
import React from "react";
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

const imgSize = 80;

const GameModeSlide = ({
  navigation,
  slide: { color, title, description, image },
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

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <BackButton />
      <View>
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
      </View>
      <View style={{ marginVertical: 20 }}>{whichComponent[title]}</View>
      {title !== "Controls" && (
        <MenuButton text="Start" operation={() => onPressButton(title)} />
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
});

export default GameModeSlide;
