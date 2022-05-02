import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import AwesomeButton from "react-native-really-awesome-button";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface MenuButtonProps {
  text: string;
  operation: () => void;
  shadowColour: string;
}

const MenuButton = ({ text, operation, shadowColour }: MenuButtonProps) => {
  return (
    <AwesomeButton
      backgroundColor={Colors.buttonBackground}
      backgroundDarker={shadowColour}
      width={230}
      borderRadius={10}
      onPress={operation}
      raiseLevel={5}
      style={styles.awesomeButtonContainer}
    >
      <View style={styles.textContainer}>
        <AutoSizeText
          fontSize={24}
          numberOfLines={2}
          mode={ResizeTextMode.max_lines}
          style={styles.label}
        >
          {text}
        </AutoSizeText>
      </View>
    </AwesomeButton>
  );
};

const styles = StyleSheet.create({
  awesomeButtonContainer: { alignSelf: "center", marginTop: 20 },
  textContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "white",
    fontFamily: "Main",
    textAlign: "center",
  },
});

export default MenuButton;
