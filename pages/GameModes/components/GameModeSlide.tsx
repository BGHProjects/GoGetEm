import { Colors } from "../../../constants/Colors";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ControlsContent from "./ControlsContent";
import ClassicContent from "./ClassicContent";
import ChasedownContent from "./ChasedownContent";
import HuntContent from "./HuntContent";
import TagTeamContent from "./TagTeamContent";
import MenuButton from "../../../components/MenuButton";
import { Mode } from "../../../constants/types";

const GameModeSlide = ({
  navigation,
  slide: { color, title, description },
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
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{ marginVertical: 20 }}>{whichComponent[title]}</View>
      {title !== "Controls" && (
        <MenuButton
          text="Start"
          shadowColour={Colors.gold}
          operation={() => onPressButton(title)}
        />
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
});

export default GameModeSlide;
