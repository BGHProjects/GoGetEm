import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const colourValues = [
  "#FE3131",
  "#C0C0C0",
  "#3EB0FF",
  "#0BE500",
  "#FEA025",
  "#A441FF",
];
const selectionWidth = 60;
const roundNumbers = [1, 2, 3, 4, 5, 6, 7];
const difficulties = ["Meh", "Oh OK", "Hang On", "What The"];

const TagTeamConfig = ({ navigation }) => {
  const [selectedColour, setSelectedColour] = useState<any>(
    colourValues[Math.floor(colourValues.length / 2)]
  );
  const [selectedRounds, setSelectedRounds] = useState<any>(
    roundNumbers[Math.floor(roundNumbers.length / 2)]
  );
  const [difficulty, setDifficulty] = useState<any>(difficulties[0]);

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

    let configDetails = {
      flag: "config",
      colour: selectedColour,
      rounds: selectedRounds,
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
  };

  const renderColour = (item?: any) => {
    return (
      <View
        style={{ ...styles.renderColourLabel, backgroundColor: `${item.item}` }}
      ></View>
    );
  };

  const renderNumber = (item?: any) => {
    return <Text style={styles.renderNumberLabel}>{item.item}</Text>;
  };

  const renderDifficulty = (item?: any) => {
    return <Text style={styles.renderDifficultyLabel}>{item.item}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.textLabelContainer}>
          <Text style={styles.textLabel}>COLOUR</Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Carousel
            data={colourValues}
            renderItem={renderColour}
            sliderWidth={width}
            itemWidth={selectionWidth + 10}
            onSnapToItem={(value) => {
              setSelectedColour(colourValues[value]);
            }}
            layout={"default"}
            inactiveSlideOpacity={0.3}
            activeAnimationType={"spring"}
            firstItem={Math.floor(colourValues.length / 2)}
          />
        </View>
        <View style={styles.textLabelContainer}>
          <Text style={styles.textLabel}>ROUNDS</Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Carousel
            data={roundNumbers}
            renderItem={renderNumber}
            sliderWidth={width}
            itemWidth={selectionWidth + 10}
            onSnapToItem={(value) => setSelectedRounds(roundNumbers[value])}
            layout={"default"}
            inactiveSlideOpacity={0.3}
            activeAnimationType={"spring"}
            firstItem={Math.floor(roundNumbers.length / 2)}
          />
        </View>

        <View style={styles.textLabelContainer}>
          <Text style={styles.textLabel}>DIFFICULTY</Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Carousel
            data={difficulties}
            renderItem={renderDifficulty}
            sliderWidth={width}
            itemWidth={selectionWidth + 50}
            onSnapToItem={(value) => setDifficulty(difficulties[value])}
            layout={"default"}
            inactiveSlideOpacity={0.3}
            activeAnimationType={"spring"}
            firstItem={0}
          />
        </View>

        <View style={styles.beginButton}>
          <TouchableOpacity onPress={() => onPressSubmit()}>
            <Text style={styles.beginButtonLabel}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  renderNumberLabel: { alignSelf: "center", color: "white", fontSize: 36 },
  renderDifficultyLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  renderColourLabel: {
    width: selectionWidth,
    height: selectionWidth,
    borderRadius: 100,

    alignItems: "center",
    justifyContent: "center",
  },
  textLabelContainer: {
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  textLabel: { fontSize: 20, color: "white" },
});

export default TagTeamConfig;
