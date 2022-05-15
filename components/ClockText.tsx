import React from "react";
import { Text } from "react-native";
import globalStyles from "../constants/GlobalStyles";

interface ClockTextProps {
  remainingTime: number;
}

const ClockText = ({ remainingTime }: ClockTextProps) => {
  return (
    <Text style={globalStyles().clockText}>
      {Math.floor(remainingTime / 60)}:
      {(remainingTime % 60).toString().length === 1 && remainingTime % 60 !== 0
        ? "0" + (remainingTime % 60)
        : remainingTime % 60}
      {remainingTime % 60 === 0 && 0}
    </Text>
  );
};

export default ClockText;
