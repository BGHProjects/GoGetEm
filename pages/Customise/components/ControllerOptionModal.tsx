import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors } from "../../../constants/Colors";

import ModalButton from "../../../components/ModalButton";
import ButtonOption from "./ButtonOption";

interface ControllerOptionModalProps {
  closeFunction: Function;
}

const ControllerOptionModal = ({
  closeFunction,
}: ControllerOptionModalProps) => {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
          <ButtonOption />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ModalButton
            text="Close"
            shadowColour="red"
            operation={() => closeFunction()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fullContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: "80%",
    backgroundColor: Colors.primaryBackground,
    borderRadius: 10,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    zIndex: 3,
  },
  scrollContainer: {
    width: "100%",
    height: "80%",
  },
});

export default ControllerOptionModal;
