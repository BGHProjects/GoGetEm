import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../constants/GlobalStyles";
import { ColorGradients, XYStart, XYEnd, Colors } from "../constants/Colors";

interface PlayerAvatarProps {
  top: number;
  left: number;
  colour: typeof ColorGradients | typeof Colors | string | string[] | undefined;
}

// TODO Decide if the "- 5" should be handled outside of this component or not
const PlayerAvatar = ({ top, left, colour }: PlayerAvatarProps) => {
  return (
    <View
      style={[
        globalStyles().playerContainer,
        {
          top: `${top - 5}%`,
          left: `${left - 5}%`,
        },
      ]}
    >
      <View style={[globalStyles().playerAvatar]}>
        <LinearGradient
          style={globalStyles().gradientFill}
          colors={colour}
          start={XYStart}
          end={XYEnd}
        />
      </View>
    </View>
  );
};

export default PlayerAvatar;
