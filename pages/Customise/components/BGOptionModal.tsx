import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import ModalButton from "../../../components/ModalButton";
import { Backgrounds } from "../../../constants/Backgrounds";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import {
  forEach,
  toPairs,
  split,
  findKey,
  values,
  parseInt,
  lowerFirst,
} from "lodash";
import Unlockables from "../../../constants/Unlockables";
import { UserContext } from "../../../tools/UserContext";
import { Data } from "../../../constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

interface BGOptionModalProps {
  modeLabel: string;
  closeFunction: Function;
}

const BGOptionModal = ({ modeLabel, closeFunction }: BGOptionModalProps) => {
  const [buttonOptions, setButtonOptions] = useState([]);
  const userContext = useContext(UserContext);
  const userLevel = userContext.level;
  const contextElements = split(
    userContext[`${lowerFirst(modeLabel)}Background`],
    "-"
  );

  let options: any = [];

  function validateItem(item, index) {
    let borderColour;

    forEach(item, (element) => {
      let type = split(element, "-")[0];
      let variant = split(element, "-")[1];
      if (type === "background") {
        if (variant === contextElements[0]) {
          borderColour = Colors.yellow;
        } else {
          borderColour = userLevel >= index ? Colors.fluroBlue : "grey";
        }

        options.push({ [index]: [element, borderColour] });
      }
    });
  }

  async function changeSetting(variant: string) {
    userContext[`set${modeLabel}Background`](variant);
    await AsyncStorage.setItem(Data[`${modeLabel}Background`], variant);
    closeFunction();
  }

  useEffect(() => {
    const initials = {
      0: ["background-forest", Colors.fluroBlue],
      1: ["background-mountains", Colors.fluroBlue],
      2: ["background-snow", Colors.fluroBlue],
    };

    forEach(initials, (e, i) => {
      validateItem(e, i);
    });

    forEach(toPairs(Unlockables), (element) => {
      let item = element[1];
      let index = element[0];
      validateItem(item, index);
    });
    setButtonOptions(options);
  }, []);

  const renderOption = ({ item }: any) => {
    let bgString = split(values(item)[0][0], "-")[1];
    let bgBorderColour = values(item)[0][1];
    let level = parseInt(findKey(item) as string);

    const itemKey = Object.keys(item)[0];

    return (
      <TouchableOpacity
        onPress={
          // Handles the initial three backgrounds
          // TODO Find a better way to do this
          userLevel >= level || level === 0 || level === 1 || level === 2
            ? () => {
                changeSetting(bgString);
              }
            : undefined
        }
      >
        <View
          key={item.toString()}
          style={[
            styles.imageOptionContainer,
            {
              borderColor: bgBorderColour,
              marginLeft: itemKey === "0" ? 30 : 0,
            },
          ]}
        >
          <ImageBackground
            source={Backgrounds[bgString as keyof typeof Backgrounds]}
            resizeMode="cover"
            style={styles.bgImage}
          />
          {level.toString().length > 1 && (
            <View style={styles.levelContainer}>
              <AutoSizeText
                fontSize={16}
                numberOfLines={1}
                mode={ResizeTextMode.max_lines}
                style={styles.levelLabel}
              >
                {level}
              </AutoSizeText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.modalContainer}>
        <View style={styles.scrollContainer}>
          <Text style={styles.modeLabel}>{modeLabel}</Text>
          <ScrollView horizontal={true}>
            {buttonOptions.map((item) => {
              return renderOption({ item });
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <ModalButton
            text="Close"
            shadowColour="red"
            operation={() => closeFunction()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: { width: "99%", height: "99%" },
  buttonContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fullContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: -150,
  },
  imageOptionContainer: {
    borderRadius: 5,
    borderWidth: 2,
    height: "90%",
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    position: "relative",
  },
  levelContainer: {
    height: 40,
    width: 40,
    backgroundColor: Colors.primaryBackground,
    position: "absolute",
    top: 5,
    left: 5,
    borderRadius: 90,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    justifyContent: "center",
  },
  levelLabel: {
    fontFamily: "Main-Bold",
    textAlign: "center",
    color: "white",
    marginTop: -5,
  },
  modalContainer: {
    width: 250,
    height: "80%",
    backgroundColor: Colors.primaryBackground,
    borderRadius: 10,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    zIndex: 3,
    marginTop: -40,
  },
  scrollContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  modeLabel: {
    textAlign: "center",
    fontFamily: "Main",
    color: Colors.white,
    fontSize: 20,
    marginTop: 10,
  },
});

export default BGOptionModal;
