import React, { useContext } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { UserContext } from "../../tools/UserContext";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import Unlockables from "../../constants/Unlockables";
import { Mode, Screens } from "../../constants/types";
import UnlockedItemCard from "./components/UnlockedItemCard";

const animationDuration = 400;

const Unlocks = ({ navigation, route }: any) => {
  const userContext = useContext(UserContext);
  const unlockedContent =
    Unlockables[userContext.level as keyof typeof Unlockables];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>You unlocked: </Text>
      {unlockedContent.map((item, index) => (
        <UnlockedItemCard
          item={item}
          delay={index * animationDuration}
          key={item.toString()}
        />
      ))}

      <MenuButton
        text="Continue"
        operation={() => navigation.navigate(Screens.GameModes)}
        shadowColour={Colors.fluroBlue}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  titleLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 30,
    marginBottom: 40,
  },
});

export default Unlocks;
