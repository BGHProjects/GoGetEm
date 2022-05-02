import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/Colors";
import { forEach, split, toPairs, keys, values, upperFirst } from "lodash";
import Selection from "../../../constants/Selections";
import ModalButton from "../../../components/ModalButton";
import ButtonOption from "./ButtonOption";
import Unlockables from "../../../constants/Unlockables";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { loadingPulsation } from "../../../constants/Animation";
import { ScrollView } from "react-native-gesture-handler";

interface ControllerOptionModalProps {
  closeFunction: Function;
  variant: Selection;
}

const ControllerOptionModal = ({
  closeFunction,
  variant,
}: ControllerOptionModalProps) => {
  let options: any = [];
  const [buttonOptions, setButtonOptions] = useState([]);

  // Filters for button position and adds it to options available to user
  function validateItem(item: Array<string>, index: string, selection: string) {
    forEach(item, (element) => {
      let positionOfElement = split(element, "-")[0];
      if (positionOfElement === selection) {
        options.push({ [index]: element });
      }
    });
  }

  useEffect(() => {
    // Converts object into iterable array
    forEach(toPairs(Unlockables), (element, i) => {
      let item = element[1];
      let index = element[0];
      validateItem(item, index, variant);
    });
    setButtonOptions(options);
  }, []);

  const [finishedLoading, setFinishedLoading] = useState(false);
  const fade = useSharedValue(1);
  const pulsating = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  });

  useEffect(() => {
    fade.value = withRepeat(
      withTiming(0, { duration: loadingPulsation }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.fullContainer}>
      <View style={styles.modalContainer}>
        {finishedLoading && (
          <Text style={styles.selectionLabel}>
            {upperFirst(variant)}
            {variant !== "outline" ? " Button" : " Colour"}
          </Text>
        )}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContainerContent}
        >
          {!finishedLoading && (
            <Animated.Text style={[styles.loadingLabel, pulsating]}>
              Loading...
            </Animated.Text>
          )}

          {buttonOptions.map((item, index) => {
            if (index === buttonOptions.length - 1 && !finishedLoading) {
              setFinishedLoading(true);
            }
            return (
              <ButtonOption
                key={values(item).toString()}
                level={parseInt(keys(item)[0])}
                variant={values(item)[0] as string}
                closeFunction={() => closeFunction()}
              />
            );
          })}
        </ScrollView>
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
  buttonContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fullContainer: {
    width: 330,
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: -70,
  },
  modalContainer: {
    width: "80%",
    height: "80%",
    backgroundColor: Colors.primaryBackground,
    borderRadius: 10,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    zIndex: 3,
  },
  scrollContainer: {
    width: "100%",
    height: "80%",
  },
  scrollContainerContent: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  loadingLabel: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    marginTop: "50%",
    fontFamily: "Main",
  },
  selectionLabel: {
    fontFamily: "Main",
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
  },
});

export default ControllerOptionModal;
