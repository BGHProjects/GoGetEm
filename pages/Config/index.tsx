import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Colors } from "../../constants/Colors";
import BGWithImage from "../../components/BGWithImage";
import SelectionHeader from "./components/SelectionHeader";
import MenuButton from "../../components/MenuButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const colourValues = [
  Colors.red,
  Colors.yellow,
  Colors.blue,
  Colors.green,
  Colors.orange,
  Colors.purple,
];
const selectionWidth = 60;
const roundNumbers = [1, 2, 3, 4, 5, 6, 7];
const difficulties = ["Meh", "Oh OK", "Hang On", "What The"];
const timeLabels = [
  "0:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
];
const timeActuals = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];

const ConfigScreen = ({ navigation, route }) => {
  const whichMode = route.params;
  const [selectedColour, setSelectedColour] = useState<any>(
    colourValues[Math.floor(colourValues.length / 2)]
  );
  const [selectedRound, setSelectedRound] = useState<any>(
    roundNumbers[Math.floor(roundNumbers.length / 2)]
  );
  const [difficulty, setDifficulty] = useState<any>(difficulties[0]);
  const [timeLimit, setTimeLimit] = useState<any>(timeActuals[0]);

  function getOtherColours() {
    let colours = [...colourValues];
    colours = colours.filter((value) => value !== selectedColour);
    let player2colour = colours[Math.floor(Math.random() * colours.length)];
    colours = colours.filter((value) => value !== player2colour);
    let player3colour = colours[Math.floor(Math.random() * colours.length)];
    colours = colours.filter((value) => value !== player3colour);
    let player4colour = colours[Math.floor(Math.random() * colours.length)];

    return [player2colour, player3colour, player4colour];
  }

  const onPressSubmit = () => {
    let otherColours = getOtherColours();
    let configDetails;

    switch (whichMode) {
      case "Classic":
        configDetails = {
          flag: "config",
          colour: selectedColour,
          rounds: selectedRound,
          difficulty: difficulty,
          player2Colour: otherColours[0],
          player3Colour: otherColours[1],
        };
        navigation.navigate("Classic Roles", configDetails);
        break;
      case "Chasedown":
        configDetails = {
          flag: "config",
          colour: selectedColour,
          rounds: selectedRound,
          timeLimit: timeLimit,
          difficulty: difficulty,
          player2Colour: otherColours[0],
          player3Colour: otherColours[1],
        };
        navigation.navigate("Chasedown Roles", configDetails);
        break;
      case "Hunt":
        configDetails = {
          flag: "config",
          colour: selectedColour,
          rounds: selectedRound,
          timeLimit: timeLimit,
          difficulty: difficulty,
          player2Colour: otherColours[0],
        };
        navigation.navigate("Hunt Roles", configDetails);
        break;
      case "TagTeam":
        configDetails = {
          flag: "config",
          colour: selectedColour,
          rounds: selectedRound,
          difficulty: difficulty,
          player2Colour: otherColours[0],
          player3Colour: otherColours[1],
          player4Colour: otherColours[2],
          team1: [selectedColour, otherColours[0]],
          team1Target: otherColours[0],
          team2: [otherColours[1], otherColours[2]],
          team2Target: otherColours[1],
        };
        navigation.navigate("TagTeam Roles", configDetails);
      default:
        break;
    }
  };

  const renderColour = (item?: any) => {
    return (
      <View
        style={{ ...styles.renderColourLabel, backgroundColor: `${item.item}` }}
      />
    );
  };

  const renderNumber = (item?: any) => {
    return <Text style={styles.renderNumberLabel}>{item.item}</Text>;
  };

  const renderDifficulty = (item?: any) => {
    return <Text style={styles.renderDifficultyLabel}>{item.item}</Text>;
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>
      <ScrollView style={{ paddingTop: 50 }}>
        <SelectionHeader label="Colour" />

        <View style={{ marginBottom: 30 }}>
          <Carousel
            data={colourValues}
            renderItem={renderColour}
            sliderWidth={width}
            itemWidth={selectionWidth + 10}
            onSnapToItem={(value) => {
              setSelectedColour(colourValues[value]);
            }}
            layout={"default"}
            inactiveSlideOpacity={0.5}
            activeAnimationType={"spring"}
            firstItem={Math.floor(colourValues.length / 2)}
            enableMomentum={false}
          />
        </View>
        <SelectionHeader label="Rounds" />
        <View style={{ marginBottom: 30 }}>
          <Carousel
            data={roundNumbers}
            renderItem={renderNumber}
            sliderWidth={width}
            itemWidth={selectionWidth + 10}
            onSnapToItem={(value) => setSelectedRound(roundNumbers[value])}
            layout={"default"}
            inactiveSlideOpacity={0.6}
            activeAnimationType={"spring"}
            enableMomentum={false}
          />
        </View>

        <SelectionHeader label="Difficulty" />
        <View style={{ marginBottom: 30 }}>
          <Carousel
            data={difficulties}
            renderItem={renderDifficulty}
            sliderWidth={width}
            itemWidth={selectionWidth + 120}
            onSnapToItem={(value) => setDifficulty(difficulties[value])}
            layout={"default"}
            inactiveSlideOpacity={0.6}
            activeAnimationType={"spring"}
            firstItem={0}
          />
        </View>

        {(whichMode === "Hunt" || whichMode === "Chasedown") && (
          <>
            <SelectionHeader label="Time Limit" />
            <View style={{ marginBottom: 30 }}>
              <Carousel
                data={timeLabels}
                renderItem={renderNumber}
                sliderWidth={width}
                itemWidth={selectionWidth + 30}
                onSnapToItem={(value) => setTimeLimit(timeActuals[value])}
                layout={"default"}
                inactiveSlideOpacity={0.3}
                activeAnimationType={"spring"}
                firstItem={Math.floor(roundNumbers.length / 2)}
              />
            </View>
          </>
        )}

        <View style={{ marginBottom: 80 }}>
          <MenuButton
            text="Begin"
            operation={() => onPressSubmit()}
            shadowColour="red"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 40,
    color: "white",
    marginTop: height / 12,
  },
  beginButton: {
    backgroundColor: "red",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  beginButtonLabel: {
    color: "white",
    fontSize: 25,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  renderNumberLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 36,
    fontFamily: "Main-Bold",
  },
  renderDifficultyLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Main-Bold",
  },
  renderColourLabel: {
    width: selectionWidth,
    height: selectionWidth,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ConfigScreen;
