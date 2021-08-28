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

const ClassicRolesScreen = ({ navigation }) => {
  const onPressSubmit = () => {
    navigation.navigate("Classic Gameplay");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Classic Roles</Text>
      <View style={styles.beginButton}>
        <TouchableOpacity onPress={() => onPressSubmit()}>
          <Text style={styles.beginButtonLabel}>Submit</Text>
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

export default ClassicRolesScreen;
