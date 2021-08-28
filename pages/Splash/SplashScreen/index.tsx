import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SplashScreen = ({ navigation }) => {
  const onPressBegin = () => {
    navigation.navigate("Main Menu");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Splash Screen</Text>
      <View style={styles.beginButton}>
        <TouchableOpacity onPress={() => onPressBegin()}>
          <Text style={styles.beginButtonLabel}>Go to Main Menu</Text>
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
    backgroundColor: "orange",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: height / 24,
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

export default SplashScreen;
