import React, { FC, useState, useEffect } from "react";
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
  "#F6FF3E",
  "#3EB0FF",
  "#0BE500",
  "#FEA025",
  "#A441FF",
];
const selectionWidth = 60;
const roundNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const difficulties = ["Meh", "Oh OK", "Hang On", "What The"];

const ClassicConfigScreen = ({ navigation }) => {
  const [selectedColour, setSelectedColour] = useState<any>(
    colourValues[Math.floor(colourValues.length / 2)]
  );
  const [selectedRound, setSelectedRound] = useState<any>(
    roundNumbers[Math.floor(roundNumbers.length / 2)]
  );
  const [difficulty, setDifficulty] = useState<any>(difficulties[0]);
  const [player2Colour, setPlayer2Colour] = useState<any>();
  const [player3Colour, setPlayer3Colour] = useState<any>();

  function getOtherColours() {
    let colours = [...colourValues];
    colours = colours.filter((value) => value !== selectedColour);
    let player2colour = colours[Math.floor(Math.random() * colours.length)];
    colours = colours.filter((value) => value !== player2colour);
    let player3colour = colours[Math.floor(Math.random() * colours.length)];

    return [player2colour, player3colour];
  }

  const onPressSubmit = () => {
    let otherColours = getOtherColours();

    let configDetails = {
      colour: selectedColour,
      rounds: selectedRound,
      difficulty: difficulty,
      player2Colour: otherColours[0],
      player3Colour: otherColours[1],
    };
    navigation.navigate("Classic Roles", configDetails);
  };

  const renderColour = (item?: any) => {
    return (
      <View
        style={{
          width: selectionWidth,
          height: selectionWidth,
          borderRadius: 100,
          backgroundColor: `${item.item}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      ></View>
    );
  };

  const renderNumber = (item?: any) => {
    return (
      <Text style={{ alignSelf: "center", color: "white", fontSize: 36 }}>
        {item.item}
      </Text>
    );
  };

  const renderDifficulty = (item?: any) => {
    return (
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        {item.item}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>COLOUR</Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Carousel
            data={colourValues}
            renderItem={renderColour}
            sliderWidth={width}
            itemWidth={selectionWidth + 10}
            onSnapToItem={(value) => setSelectedColour(colourValues[value])}
            layout={"default"}
            inactiveSlideOpacity={0.3}
            activeAnimationType={"spring"}
            firstItem={Math.floor(colourValues.length / 2)}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>ROUNDS</Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Carousel
            data={roundNumbers}
            renderItem={renderNumber}
            sliderWidth={width}
            itemWidth={selectionWidth + 10}
            onSnapToItem={(value) => setSelectedRound(roundNumbers[value])}
            layout={"default"}
            inactiveSlideOpacity={0.3}
            activeAnimationType={"spring"}
            firstItem={Math.floor(roundNumbers.length / 2)}
          />
        </View>

        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>DIFFICULTY</Text>
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
    marginTop: height / 24,
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
});

export default ClassicConfigScreen;
