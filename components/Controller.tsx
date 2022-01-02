import React, { useState, useEffect, FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Svg, Circle, ForeignObject } from "react-native-svg";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

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
  const somethingElse = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 200,
          borderColor: "red",
          borderWidth: 4,
        }}
      >
        {/* Top Button */}
        <TouchableOpacity onPress={() => movePlayerUp()}>
          <View
            style={{
              backgroundColor: "transparent",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-checkmark-circle" size={50} color={"red"} />
          </View>
        </TouchableOpacity>

        {/* Right Button */}
        <TouchableOpacity onPress={() => movePlayerRight()}>
          <View
            style={{
              backgroundColor: "transparent",
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-checkmark-circle" size={50} color={"yellow"} />
          </View>
        </TouchableOpacity>

        {/* Bottom Button */}
        <TouchableOpacity onPress={() => movePlayerDown()}>
          <View
            style={{
              backgroundColor: "transparent",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionicons name="md-checkmark-circle" size={50} color={"blue"} />
          </View>
        </TouchableOpacity>

        {/* Left Button */}
        <TouchableOpacity onPress={() => movePlayerLeft()}>
          <View
            style={{
              backgroundColor: "transparent",
              alignSelf: "flex-start",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="md-checkmark-circle"
              size={50}
              color={"lightgreen"}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
        />

        {/* Top Button */}
        <Circle
          cx="50%"
          cy="15%"
          r={height / 52}
          onPress={() => movePlayerUp()}
          stroke="orange"
          strokeWidth="2"
        />

        {/* Left Button */}
        <Circle
          cx="15%"
          cy="50%"
          r={height / 52}
          stroke="orange"
          strokeWidth="2"
          onPress={() => movePlayerLeft()}
        />

        {/* Down Button */}
        <Circle
          cx="50%"
          cy="85%"
          r={height / 52}
          stroke="orange"
          strokeWidth="2"
          onPress={() => movePlayerDown()}
        />

        {/* Right Button */}
        <Circle
          cx="85%"
          cy="50%"
          r={height / 52}
          stroke="orange"
          strokeWidth="2"
          onPress={() => movePlayerRight()}
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
