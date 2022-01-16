import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";

import { UserContext } from "../../tools/UserContext";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SplashScreen = ({ navigation }) => {
  const onPressBegin = () => {
    navigation.navigate("Main Menu");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/GoGetEm_MainMenuBackground.jpg")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Text style={styles.titleLabel}>GoGetEm</Text>
        <TouchableOpacity onPress={() => onPressBegin()}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Play</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Implement me!")}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Implement me!")}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Implement me!")}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Credits</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 40,
    color: "white",
    marginTop: height / 12,
    fontFamily: "Ninja-Italics-Condensed",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "orange",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height / 24,
    alignSelf: "center",
  },
  buttonLabel: {
    color: "white",
    fontSize: 25,
    paddingVertical: 10,
    width: "100%",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SplashScreen;
