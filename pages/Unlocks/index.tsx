import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { UserContext } from "../../tools/UserContext";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import Unlockables from "../../constants/Unlockables";
import determineDetails from "./helpers/determineDetails";
import Selection from "../../components/Selection";
import { Backgrounds } from "../../constants/Backgrounds";

const Unlocks = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const unlockedContent = Unlockables[userContext.level];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.resultLabel}>You unlocked: </Text>
      {unlockedContent.map((item) => {
        const { colourUsed, label } = determineDetails(item);

        return (
          <View
            key={item.toString()}
            style={[
              styles.optionContainer,
              {
                borderColor: colourUsed,
              },
            ]}
          >
            {/**
             * Displays either a background image or controller/outline option
             * depending on what has been unlocked
             */}
            <View style={styles.previewContainer}>
              {item.split("-")[0] === "background" ? (
                <ImageBackground
                  source={Backgrounds[item.split("-")[1]]}
                  style={styles.bgImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.buttonOptionOuterContainer}>
                  <View style={styles.buttonOptionInnerContainer}>
                    <Selection variant={item} />
                  </View>
                </View>
              )}
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.itemLabel}>{label}</Text>
            </View>
          </View>
        );
      })}

      <MenuButton
        text="Continue"
        shadowColour="red"
        operation={() => navigation.navigate("Game Modes")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgImage: { width: "99%", height: "99%" },
  buttonOptionOuterContainer: { width: 50, height: 50, position: "relative" },
  buttonOptionInnerContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -4,
  },
  previewContainer: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  labelContainer: {
    height: "100%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContainer: {
    width: "80%",
    height: 60,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  itemLabel: {
    color: "white",
    fontSize: 12,
    fontFamily: "Main-Bold",
    marginTop: -5,
    textAlign: "center",
  },
  resultLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 30,
    marginBottom: 40,
  },
});

export default Unlocks;
