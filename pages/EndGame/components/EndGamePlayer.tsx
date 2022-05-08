import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, XYEnd, XYStart } from "../../../constants/Colors";
import globalStyles from "../../../constants/GlobalStyles";

interface EndGamePlayerProps {
  player: string[];
}

const EndGamePlayer = ({ player }: EndGamePlayerProps) => {
  return (
    <View style={styles.playerRepresentation}>
      <LinearGradient
        style={globalStyles().gradientFill}
        colors={player}
        start={XYStart}
        end={XYEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerRepresentation: {
    height: 40,
    width: 40,
    borderRadius: 90,
    alignSelf: "center",
    borderColor: Colors.white,
    borderWidth: 2,
  },
});

export default EndGamePlayer;
