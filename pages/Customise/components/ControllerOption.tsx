import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Controller from "../../../components/Controller/Controller";
import ControllerOptionModal from "./ControllerOptionModal";
import Selection from "../../../constants/Selections";
import { Colors } from "../../../constants/Colors";

const ControllerOption = () => {
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState<Selection>(Selection.None);

  function makeSelection(selection: Selection) {
    setShowModal(true);
    setSelection(selection);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>
          Tap any part of the controller to customise
        </Text>
      </View>

      <Controller
        outerCircle={() => makeSelection(Selection.Outline)}
        downFunction={() => makeSelection(Selection.Down)}
        upFunction={() => makeSelection(Selection.Top)}
        rightFunction={() => makeSelection(Selection.Right)}
        leftFunction={() => makeSelection(Selection.Left)}
      />
      {showModal && (
        <ControllerOptionModal
          closeFunction={() => setShowModal(false)}
          variant={selection}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 40,
  },
  textContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: -20,
    marginBottom: 30,
    marginTop: -30,
  },
  label: {
    color: Colors.white,
    fontFamily: "Main",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ControllerOption;
