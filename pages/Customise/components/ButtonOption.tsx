import React, { useContext, useReducer, useEffect, useState } from "react";
import { UserContext, userReducer } from "../../../tools/UserContext";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Colors } from "../../../constants/Colors";
import Selection from "./Selection";
import { split, capitalize } from "lodash";
import * as firebase from "firebase";

interface ButtonOptionProps {
  level: number;
  variant: string;
  closeFunction: () => void;
}

const ButtonOption = ({ level, variant, closeFunction }: ButtonOptionProps) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const userLevel = userContext.level;
  const dbUser = firebase.database().ref("users/" + userContext.username);
  const position = capitalize(split(variant, "-")[0]);
  const variantElements = split(variant, "-");
  const [borderColour, setBorderColour] = useState("grey");

  function changeSetting(variant: string) {
    if (split(variant, "-").length > 2) {
      dispatch({ type: `change${position}`, payload: variant });
      dbUser.update({
        [`controller${position}Button`]: variant,
      });
    } else {
      dispatch({ type: "changeOutline", payload: variant });
      dbUser.update({
        controllerOutlineColour: variant,
      });
    }

    setBorderColour(Colors.yellow);
    closeFunction();
  }

  useEffect(() => {
    if (capitalize(variantElements[0]) === position) {
      let contextElements = split(
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
      <View
        style={[
          styles.optionContainer,
          {
            position: "relative",
          },
        ]}
      >
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
