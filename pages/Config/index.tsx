import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Colors } from "../../constants/Colors";
import MenuButton from "../../components/MenuButton";
import { onPressSubmit, getOtherColours } from "./helpers";
import {
  renderColour,
  renderDifficulty,
  renderNumber,
} from "./components/renders";
import SelectionCarousel from "./components/SelectionCarousel";
import {
  colourValues,
  selectionWidth,
  roundNumbers,
  difficulties,
  timeLabels,
  timeActuals,
} from "./values";
import TitleText from "../../components/TitleText";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ConfigScreen = ({ navigation, route }) => {
  const whichMode = route.params;
  const [selectedColour, setSelectedColour] = useState<any>(
    colourValues[Math.floor(colourValues.length / 2)]
  );
  const [selectedRound, setSelectedRound] = useState<any>(
    roundNumbers[Math.floor(roundNumbers.length / 2)]
  );
  const [difficulty, setDifficulty] = useState<any>(
    difficulties[Math.floor(roundNumbers.length / 2)]
  );
  const [timeLimit, setTimeLimit] = useState<any>(
    timeActuals[Math.floor(roundNumbers.length / 2)]
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>
      <TitleText text={whichMode} style={{ marginBottom: 40 }} />

      <ScrollView>
        <SelectionCarousel
          headerLabel="Colour"
          values={colourValues}
          renderComponent={renderColour}
          width={width}
          selectionWidth={selectionWidth}
          operation={(value) => {
            setSelectedColour(colourValues[value]);
          }}
          itemBuffer={10}
        />

        <SelectionCarousel
          headerLabel="Rounds"
          values={roundNumbers}
          renderComponent={renderNumber}
          width={width}
          selectionWidth={selectionWidth}
          operation={(value) => {
            setSelectedRound(roundNumbers[value]);
          }}
          itemBuffer={10}
        />

        <SelectionCarousel
          headerLabel="Difficulty"
          values={difficulties}
          renderComponent={renderDifficulty}
          width={width}
          selectionWidth={selectionWidth}
          operation={(value) => {
            setDifficulty(difficulties[value]);
          }}
          itemBuffer={120}
        />

        {(whichMode === "Hunt" || whichMode === "Chasedown") && (
          <SelectionCarousel
            headerLabel="Time Limit"
            values={timeLabels}
            renderComponent={renderNumber}
            width={width}
            selectionWidth={selectionWidth}
            operation={(value) => {
              setTimeLimit(timeActuals[value]);
            }}
            itemBuffer={30}
          />
        )}

        <View style={{ marginBottom: 80 }}>
          <MenuButton
            text="Begin"
            operation={() =>
              onPressSubmit({
                otherColours: getOtherColours({
                  colours: colourValues,
                  selectedColour,
                }),
                whichMode,
                selectedColour,
                selectedRound,
                timeLimit,
                difficulty,
                navigation,
              })
            }
            shadowColour="red"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfigScreen;