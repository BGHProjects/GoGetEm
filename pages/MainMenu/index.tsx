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
        <TouchableOpacity onPress={() => onPressButton("Classic Config")}>
          <View style={[styles.button, { backgroundColor: "dodgerblue" }]}>
            <Text style={styles.buttonLabel}>Classic Mode</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressButton("Chasedown Config")}>
          <View style={[styles.button, { backgroundColor: "red" }]}>
            <Text style={styles.buttonLabel}>ChaseDown Mode</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressButton("Hunt Config")}>
          <View style={[styles.button, { backgroundColor: "purple" }]}>
            <Text style={styles.buttonLabel}>Hunt Mode</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressButton("TagTeam Config")}>
          <View style={[styles.button, { backgroundColor: "green" }]}>
            <Text style={styles.buttonLabel}>TagTeam Mode</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Implement me!")}>
          <View style={[styles.button, { backgroundColor: "orange" }]}>
            <Text style={styles.buttonLabel}>How to Play</Text>
          </View>
        </TouchableOpacity>
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
  button: {
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
