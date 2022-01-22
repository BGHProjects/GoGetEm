import React, { FC } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Svg, Circle, Text } from "react-native-svg";
import CircleButton from "./CircleButton";
import SquareButton from "./SquareButton";
import TriangleButton from "./TriangleButton";
import ShardButton from "./ShardButton";
import PointerButton from "./PointerButton";
import LetterButton from "./LetterButton";

const height = Dimensions.get("window").height;

interface Props {
  movePlayerUp: Function;
  movePlayerLeft: Function;
  movePlayerDown: Function;
  movePlayerRight: Function;
}

const Controller: FC<Props> = ({
  movePlayerUp,
  movePlayerLeft,
  movePlayerDown,
  movePlayerRight,
}) => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        {/* Controller Backround */}
        <Circle
          cx="50%"
          cy="50%"
          r={height / 13}
          stroke="red"
          strokeWidth="2"
          fill="transparent"
        />

        {/* Top Button */}

        <PointerButton
          buttonFunction={() => movePlayerUp()}
          colour={"orange"}
          position={"top"}
        />

        {/*
         * ! Left Button
         */}
        <LetterButton
          buttonFunction={() => movePlayerLeft()}
          colour={"yellow"}
          position={"left"}
          letter="B"
        />

        {/* Down Button */}

        <TriangleButton
          buttonFunction={() => movePlayerDown()}
          colour={"green"}
          position={"down"}
        />

        {/* Right Button */}

        <ShardButton
          buttonFunction={() => movePlayerRight()}
          colour={"dodgerblue"}
          position={"right"}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: height / 3,
    width: height / 3,
    marginTop: 10,
  },
});

export default Controller;
