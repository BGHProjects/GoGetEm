import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Backgrounds } from "../../../constants/Backgrounds";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { capitalize, lowerFirst } from "lodash";
import { UserContext } from "../../../tools/UserContext";

interface BGOptionProps {
  modeLabel: string;
  selectionLabel: string;
  selection: string;
}

const BGOption = ({ modeLabel, selectionLabel, selection }: BGOptionProps) => {
  const [showModal, setShowModal] = useState(false);
  const [BGLabel, setBGLabel] = useState(selectionLabel);
  const [BG, setBG] = useState(selection);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setBGLabel(capitalize(userContext[`${lowerFirst(modeLabel)}Background`]));
    setBG(userContext[`${lowerFirst(modeLabel)}Background`]);
  }, [showModal]);

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelsContainer}>
        <AutoSizeText
          fontSize={14}
          numberOfLines={2}
          mode={ResizeTextMode.max_lines}
          style={styles.modeLabel}
        >
          {modeLabel}
        </AutoSizeText>
        <AutoSizeText
          fontSize={20}
          numberOfLines={2}
          mode={ResizeTextMode.max_lines}
          style={styles.selectionLabel}
        >
          {BGLabel}
        </AutoSizeText>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={Backgrounds[BG as keyof typeof Backgrounds]}
          style={styles.bgImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: { width: "99%", height: "99%" },
  imageContainer: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  modeLabel: {
    fontFamily: "Main",
    color: "white",
    textAlign: "left",
    marginLeft: 10,
  },
  labelsContainer: {
    height: "70%",
    width: "50%",
    justifyContent: "space-evenly",
  },
  optionContainer: {
    width: 250,
    height: 110,
    borderRadius: 5,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 50,
    backgroundColor: Colors.primaryBackground,
  },
  selectionLabel: {
    fontFamily: "Main-Bold",
    color: "white",
    textAlign: "center",
  },
});

export default BGOption;
