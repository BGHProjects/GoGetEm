import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import Controller from "../../../components/Controller/Controller";

import ControllerOptionModal from "./ControllerOptionModal";

const ControllerOption = () => {
  const [showModal, setshowModal] = useState(true);

  return (
    <View style={styles.container}>
      <Controller
        outerCircle={() => setshowModal(true)}
        movePlayerDown={() => console.log("Down")}
        movePlayerUp={() => setshowModal(true)}
        movePlayerRight={() => console.log("Right")}
        movePlayerLeft={() => console.log("Left")}
      />
      {showModal && (
        <ControllerOptionModal closeFunction={() => setshowModal(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ControllerOption;
