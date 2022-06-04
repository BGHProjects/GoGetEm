import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Mode } from "../../../constants/types";
import BGOption from "./BGOption";
import { UserContext } from "../../../tools/UserContext";
import { upperFirst, lowerFirst } from "lodash";
import BGOptionModal from "./BGOptionModal";
import { TouchableOpacity } from "react-native-gesture-handler";

const marginNumber = 100;

const BackgroundOptions = () => {
  const userContext = useContext(UserContext);
  const modes = Object.values(Mode);

  const [modePressed, setModePressed] = useState<Mode | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const handleOptionPressed = (mode: Mode) => {
    setModePressed(mode);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      {!showModal && (
        <ScrollView>
          {modes.map((mode: Mode) => {
            return (
              <TouchableOpacity
                onPress={() => handleOptionPressed(mode)}
                key={mode.toString()}
              >
                <BGOption
                  key={mode}
                  modeLabel={mode}
                  selectionLabel={upperFirst(
                    userContext[`${lowerFirst(mode)}Background`]
                  )}
                  selection={userContext[`${lowerFirst(mode)}Background`]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {showModal && (
        <View style={{ marginTop: -marginNumber }}>
          <BGOptionModal
            closeFunction={() => setShowModal(false)}
            modeLabel={modePressed as string}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: marginNumber,
  },
});

export default BackgroundOptions;
