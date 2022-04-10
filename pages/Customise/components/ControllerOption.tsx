import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Controller from "../../../components/Controller/Controller";
import ControllerOptionModal from "./ControllerOptionModal";
import Selection from "../../../constants/Selections";

const ControllerOption = () => {
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState<Selection>(Selection.None);

  function makeSelection(selection: Selection) {
    setShowModal(true);
    setSelection(selection);
  }

  return (
    <View style={styles.container}>
      <Controller
        outerCircle={() => makeSelection(Selection.Outline)}
        movePlayerDown={() => makeSelection(Selection.Down)}
        movePlayerUp={() => makeSelection(Selection.Top)}
        movePlayerRight={() => makeSelection(Selection.Right)}
        movePlayerLeft={() => makeSelection(Selection.Left)}
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
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ControllerOption;
