import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../tools/UserContext";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Colors } from "../../../constants/Colors";
import Selection from "../../../components/Selection";
import { split, capitalize } from "lodash";
import { Data } from "../../../constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ButtonOptionProps {
  level: number;
  variant: string;
  closeFunction: () => void;
}

const ButtonOption = ({ level, variant, closeFunction }: ButtonOptionProps) => {
  const userContext = useContext(UserContext);
  const userLevel = userContext.level;
  const position = capitalize(split(variant, "-")[0]);
  const variantElements = split(variant, "-");
  const [borderColour, setBorderColour] = useState("grey");

  async function changeSetting(variant: string) {
    if (split(variant, "-").length > 2) {
      userContext[`setController${capitalize(position)}Button`](variant);

      await AsyncStorage.setItem(Data[`Controller${position}Button`], variant);
    } else {
      userContext.setControllerOutlineColour(variant);
      await AsyncStorage.setItem(Data.ControllerOutlineColour, variant);
    }

    setBorderColour(Colors.yellow);
    closeFunction();
  }

  useEffect(() => {
    if (capitalize(variantElements[0]) === position) {
      const contextElements = split(
        userContext[`controller${position}Button`],
        "-"
      );

      if (
        variantElements[1] === contextElements[1] &&
        variantElements[2] === contextElements[2]
      ) {
        setBorderColour(Colors.yellow);
      } else {
        setBorderColour(userLevel >= level ? Colors.fluroBlue : "grey");
      }
    } else {
      setBorderColour(userLevel >= level ? Colors.fluroBlue : "grey");
    }
  }, []);

  return (
    <View style={{ position: "relative" }}>
      <TouchableHighlight
        onPress={
          userLevel >= level
            ? () => {
                changeSetting(variant);
              }
            : undefined
        }
        // TODO Make this better
        style={{
          zIndex: 4,
          position: "absolute",
        }}
      >
        <View
          style={[
            styles.optionContainer,
            {
              borderColor: borderColour,
            },
          ]}
        />
      </TouchableHighlight>
      <View style={styles.optionContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.levelLabel}>{level}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Selection variant={variant} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -4,
  },
  labelContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
  },
  levelLabel: {
    color: "white",
    fontFamily: "Main",
    fontSize: 12,
    marginLeft: 5,
  },
  optionContainer: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 5,
    position: "relative",
    margin: 5,
  },
});

export default ButtonOption;
