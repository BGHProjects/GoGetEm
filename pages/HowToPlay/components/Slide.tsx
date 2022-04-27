import { Colors } from "../../../constants/Colors";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ControlsContent from "./ControlsContent";
import ClassicContent from "./ClassicContent";
import ChasedownContent from "./ChasedownContent";
import HuntContent from "./HuntContent";
import TagTeamContent from "./TagTeamContent";

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
  };
}

const Test = () => {
  return <View style={{ width: 50, height: 50, backgroundColor: "red" }} />;
};

const Slide = ({ slide: { color, title, description } }: SlideProps) => {
  const whichComponent: Record<string, React.ReactNode> = {
    Controls: <ControlsContent />,
    "Classic Mode": <ClassicContent />,
    "Chasedown Mode": <ChasedownContent />,
    "Hunt Mode": <HuntContent />,
    "TagTeam Mode": <TagTeamContent />,
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: color }]}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {/* This is where each page's animation will be */}
        <View style={{ marginVertical: 20 }}>{whichComponent[title]}</View>
      </View>
    </>
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

export default Slide;
