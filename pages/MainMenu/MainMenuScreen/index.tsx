import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const MainMenuScreen = ({ navigation }) => {
  const onPressButton = (gameMode: string) => {
    navigation.navigate(gameMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Main Menu</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.classicModeButton}>
          <TouchableOpacity onPress={() => onPressButton("Classic Config")}>
            <Text style={styles.buttonLabel}>Classic Mode</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chaseDownModeButton}>
          <TouchableOpacity onPress={() => onPressButton("ChaseDown Config")}>
            <Text style={styles.buttonLabel}>ChaseDown Mode</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.huntModeButton}>
          <TouchableOpacity onPress={() => onPressButton("Classic Config")}>
            <Text style={styles.buttonLabel}>Hunt Mode</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagTeamModeButton}>
          <TouchableOpacity onPress={() => onPressButton("Classic Config")}>
            <Text style={styles.buttonLabel}>TagTeam Mode</Text>
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
  scrollView: {
    marginTop: height / 24,
  },
  classicModeButton: {
    backgroundColor: "dodgerblue",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height / 24,
  },
  chaseDownModeButton: {
    backgroundColor: "red",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height / 24,
  },
  huntModeButton: {
    backgroundColor: "purple",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height / 24,
  },
  tagTeamModeButton: {
    backgroundColor: "lime",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height / 24,
  },
  buttonLabel: {
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

export default MainMenuScreen;
