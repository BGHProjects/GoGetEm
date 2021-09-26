import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Svg, Line } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ClassicRolesScreen = ({ navigation, route }) => {
  const configDetails = route.params;
  let scoreDetails;

  if (configDetails.flag === "config") {
    scoreDetails = {
      player1Score: 0,
      player2Score: 0,
      player3Score: 0,
      currentRound: 1,
      gameOver: false,
    };
  }

  let totalDetails = { ...configDetails, ...scoreDetails };

  console.log("totalDetails ", totalDetails);

  const onPressSubmit = () => {
    navigation.navigate("Classic Gameplay", totalDetails);
  };

  if (totalDetails.gameOver) {
    setTimeout(() => {
      navigation.navigate("Main Menu");
    }, 3000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 90,
          backgroundColor: `${configDetails.colour}`,
          marginBottom: 50,
          justifyContent: "center",
        }}
      >
        {totalDetails.flag === "gameplay" && (
          <Text
            style={{
              fontSize: 30,
              color: "black",
              alignSelf: "center",
            }}
          >
            {totalDetails.player1Score}
          </Text>
        )}
      </View>

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={{
          position: "absolute",
          left: 190,
          top: 180,
          transform: [{ rotate: "145deg" }],
        }}
      />

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={{
          position: "absolute",
          left: 130,
          top: 180,
          transform: [{ rotate: "35deg" }],
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: width * 0.9,
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 90,
            backgroundColor: `${configDetails.player3Colour}`,
            justifyContent: "center",
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text
              style={{
                fontSize: 30,
                color: "black",
                alignSelf: "center",
              }}
            >
              {totalDetails.player3Score}
            </Text>
          )}
        </View>
        <Ionicons
          name="arrow-down"
          size={40}
          color={"white"}
          style={{
            position: "absolute",
            left: 140,
            transform: [{ rotate: "270deg" }],
          }}
        />
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 90,
            backgroundColor: `${configDetails.player2Colour}`,
            justifyContent: "center",
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text
              style={{
                fontSize: 30,
                color: "black",
                alignSelf: "center",
              }}
            >
              {totalDetails.player2Score}
            </Text>
          )}
        </View>
      </View>

      {!totalDetails.gameOver ? (
        <View style={styles.beginButton}>
          <TouchableOpacity onPress={() => onPressSubmit()}>
            <Text style={styles.beginButtonLabel}>{`Start\nRound`}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noBeginButton}></View>
      )}
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
    marginTop: 100,
  },
  noBeginButton: {
    backgroundColor: "black",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
    paddingVertical: 10,
  },
  beginButtonLabel: {
    color: "white",
    fontSize: 25,
    paddingVertical: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClassicRolesScreen;
