import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import Carousel from "react-native-snap-carousel";

import ModalButton from "../../../components/ModalButton";
import { Backgrounds } from "../../../constants/Backgrounds";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import {
  forEach,
  toPairs,
  split,
  findKey,
  values,
  lowerCase,
  parseInt,
} from "lodash";
import Unlockables from "../../../constants/Unlockables";
import * as firebase from "firebase";
import { UserContext, userReducer } from "../../../tools/UserContext";

interface BGOptionModalProps {
  modeLabel: string;
  closeFunction: Function;
}

const BGOptionModal = ({ modeLabel, closeFunction }: BGOptionModalProps) => {
  const [buttonOptions, setButtonOptions] = useState([]);
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const userLevel = userContext.level;
  const dbUser = firebase.database().ref("users/" + userContext.username);
  const contextElements = split(
    userContext[`${lowerCase(modeLabel)}Background`],
    "-"
  );

  let options = [];

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

  function changeSetting(variant: string) {
    dispatch({
      type: `change${modeLabel}BG`,
      payload: variant,
    });
    dbUser.update({
      [`${lowerCase(modeLabel)}Background`]: variant,
    });
    closeFunction();
  }

  useEffect(() => {
    forEach(toPairs(Unlockables), (element, i) => {
      let item = element[1];
      let index = element[0];
      validateItem(item, index);
    });
    setButtonOptions(options);
  }, []);

  const renderOption = ({ item }) => {
    let bgString = split(values(item)[0][0], "-")[1];
    let bgBorderColour = values(item)[0][1];
    let level = parseInt(findKey(item));

    return (
      <TouchableOpacity
        onPress={
          userLevel >= level
            ? () => {
                changeSetting(bgString);
              }
            : undefined
        }
      >
        <View
          style={[styles.imageOptionContainer, { borderColor: bgBorderColour }]}
        >
          <ImageBackground
            source={Backgrounds[bgString]}
            resizeMode="cover"
            style={styles.bgImage}
          />
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.modalContainer}>
        <View style={styles.scrollContainer}>
          <Carousel
            data={buttonOptions}
            renderItem={renderOption}
            sliderWidth={245}
            itemWidth={160}
            layout={"default"}
            inactiveSlideOpacity={0.5}
            activeAnimationType={"spring"}
            enableMomentum={false}
          />
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
  },
  imageOptionContainer: {
    borderRadius: 5,
    borderWidth: 2,
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
});

export default BGOptionModal;
