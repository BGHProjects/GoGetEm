import React, { FC, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { Colors } from "../../constants/Colors";
import { UserContext } from "../../tools/UserContext";
import { split } from "lodash";
import ControllerButton from "./ControllerButton";

const height = Dimensions.get("window").height;

interface Props {
  outerCircle?: Function;
  upFunction: Function;
  leftFunction: Function;
  downFunction: Function;
  rightFunction: Function;
}

const Controller: FC<Props> = ({
  outerCircle,
  upFunction,
  leftFunction,
  downFunction,
  rightFunction,
}) => {
  const userContext = useContext(UserContext);
  const outlineColour = split(userContext.controllerOutlineColour, "-")[1];

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        {/* Controller Backround */}
        <Circle
          cx="50%"
          cy="50%"
          r={height / 13}
          stroke={Colors[`${outlineColour}`]}
          strokeWidth="2"
          fill={Colors.transparentBlack}
          onPress={outerCircle !== undefined ? () => outerCircle() : undefined}
        />

        {/* Top Button */}
        <ControllerButton
          whichButton={userContext.controllerTopButton}
          operation={() => upFunction()}
        />

        {/*
         * Left Button
         */}
        <ControllerButton
          whichButton={userContext.controllerLeftButton}
          operation={() => leftFunction()}
        />

        {/* Down Button */}

        <ControllerButton
          whichButton={userContext.controllerDownButton}
          operation={() => downFunction()}
        />

        {/* Right Button */}
        <ControllerButton
          whichButton={userContext.controllerRightButton}
          operation={() => rightFunction()}
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
