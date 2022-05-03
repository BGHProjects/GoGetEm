import React from "react";
import { Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import { Colors } from "../../../constants/Colors";

interface StatProgressBarProps {
  progressValue: number;
  completeValue: number;
}

const StatProgressBar = ({
  progressValue,
  completeValue,
}: StatProgressBarProps) => {
  const width = Dimensions.get("window").width;

  return (
    <Progress.Bar
      width={width / 2.5}
      progress={
        // Avoids infinity problems if one of the values is 0
        Number(progressValue) !== 0 && Number(completeValue) !== 0
          ? Number(Number(progressValue) / Number(completeValue))
          : 0
      }
      style={{ marginTop: 20 }}
      color={Colors.green}
      unfilledColor={Colors.red}
      borderWidth={0}
    />
  );
};

export default StatProgressBar;
