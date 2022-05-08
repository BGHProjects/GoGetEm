import React from "react";
import { View, StyleSheet } from "react-native";
import ControllerOption from "./ControllerOption";
import BackgroundOptions from "./BackgroundOptions";
import BackButton from "../../../components/BackButton";

const CustomiseSlide = ({ slide: { color, variant } }: any) => {
  const whichContent: Record<string, React.ReactNode> = {
    Controller: <ControllerOption />,
    Backgrounds: <BackgroundOptions />,
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <BackButton />
      {whichContent[variant]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
});

export default CustomiseSlide;
