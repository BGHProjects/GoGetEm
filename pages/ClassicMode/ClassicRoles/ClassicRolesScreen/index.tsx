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
  //console.log("\nConfigDetails ", configDetails);

  const onPressSubmit = () => {
    navigation.navigate("Classic Gameplay");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 90,
          backgroundColor: `${route.params.colour}`,
          marginBottom: 50,
        }}
      ></View>

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={{
          position: "absolute",
          left: 190,
          top: 180,
          transform: [{ rotate: "325deg" }],
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
          transform: [{ rotate: "215deg" }],
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
            backgroundColor: `${route.params.player2Colour}`,
          }}
        ></View>
        <Ionicons
          name="arrow-down"
          size={40}
          color={"white"}
          style={{
            position: "absolute",
            left: 140,
            transform: [{ rotate: "90deg" }],
          }}
        />
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 90,
            backgroundColor: `${route.params.player3Colour}`,
          }}
        ></View>
      </View>

      <View style={styles.beginButton}>
        <TouchableOpacity onPress={() => onPressSubmit()}>
          <Text style={styles.beginButtonLabel}>Ready?</Text>
        </TouchableOpacity>
      </View>
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
  beginButtonLabel: {
    color: "white",
    fontSize: 25,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClassicRolesScreen;
