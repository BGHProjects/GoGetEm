import React from "react";
import { StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";

import { Colors } from "../constants/Colors";
import AwesomeButton from "react-native-really-awesome-button";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface ModalButtonProps {
  text: string;
  operation: Function;
  shadowColour: string;
}

const ModalButton = ({ text, operation, shadowColour }: ModalButtonProps) => {
  return (
    <AwesomeButton
      backgroundColor={Colors.buttonBackground}
      backgroundDarker={shadowColour}
      width={200}
      borderRadius={10}
      onPress={operation}
      raiseLevel={5}
      style={{ alignSelf: "center" }}
    >
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AutoSizeText
          fontSize={18}
          numberOfLines={1}
          mode={ResizeTextMode.max_lines}
          style={{
            color: "white",
            fontFamily: "Main",
            textAlign: "center",
          }}
        >
          {text}
        </AutoSizeText>
      </View>
    </AwesomeButton>
  );
};

export default ModalButton;
