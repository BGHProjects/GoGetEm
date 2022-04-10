import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Backgrounds } from "../../../constants/Backgrounds";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { capitalize } from "lodash";

import BGOptionModal from "./BGOptionModal";
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
    switch (modeLabel) {
      case "Classic":
        setBGLabel(capitalize(userContext.classicBackground));
        setBG(userContext.classicBackground);
        break;
      case "Chasedown":
        setBGLabel(capitalize(userContext.chasedownBackground));
        setBG(userContext.chasedownBackground);
        break;
      case "Hunt":
        setBGLabel(capitalize(userContext.huntBackground));
        setBG(userContext.huntBackground);
        break;
      case "TagTeam":
        setBGLabel(capitalize(userContext.tagTeamBackground));
        setBG(userContext.tagTeamBackground);
        break;
      default:
        break;
    }
  }, [showModal]);

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={styles.optionContainer}>
          <View style={styles.labelsContainer}>
            <AutoSizeText
              fontSize={18}
              numberOfLines={2}
              mode={ResizeTextMode.max_lines}
              style={styles.modeLabel}
            >
              {modeLabel}
            </AutoSizeText>
            <AutoSizeText
              fontSize={24}
              numberOfLines={2}
              mode={ResizeTextMode.max_lines}
              style={styles.selectionLabel}
            >
              {BGLabel}
            </AutoSizeText>
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={Backgrounds[BG]}
              style={styles.bgImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </TouchableOpacity>
      {showModal && (
        <BGOptionModal
          closeFunction={() => setShowModal(false)}
          modeLabel={modeLabel}
        />
      )}
    </>
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
    width: 300,
    height: 120,
    borderRadius: 5,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  selectionLabel: {
    fontFamily: "Main-Bold",
    color: "white",
    textAlign: "center",
  },
});

export default BGOption;