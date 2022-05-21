import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface InvalidLevelModalProps {
  level: number;
  closeFunction: () => void;
}

const modalHeight = 150;
const modalWidth = 200;

const InvalidLevelModal = ({
  level,
  closeFunction,
}: InvalidLevelModalProps) => {
  return (
    <View style={styles.shadowContainer}>
      <View style={styles.modalContainer}>
        <View style={styles.closingCrossContainer}>
          <TouchableOpacity onPress={closeFunction}>
            <Ionicons name="close" size={30} color={Colors.fluroBlue} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: "Main", color: Colors.white, fontSize: 16 }}>
          You must be level {level}
          {"\n"} to unlock this item
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    position: "absolute",
    borderRadius: 10,
    height: "100%",
    width: "100%",
    backgroundColor: Colors.darkTransparentBlack,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    height: modalHeight,
    width: modalWidth,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.fluroBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  closingCrossContainer: {
    position: "absolute",
    top: 5,
    left: modalWidth - 40,
  },
});

export default InvalidLevelModal;
