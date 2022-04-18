import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../../constants/Colors";
import { forEach, split, toPairs, keys, values } from "lodash";

import Selection from "../../../constants/Selections";
import ModalButton from "../../../components/ModalButton";
import ButtonOption from "./ButtonOption";
import Unlockables from "../../../constants/Unlockables";

interface ControllerOptionModalProps {
  closeFunction: Function;
  variant: Selection;
}

const ControllerOptionModal = ({
  closeFunction,
  variant,
}: ControllerOptionModalProps) => {
  let options = [];
  const [buttonOptions, setButtonOptions] = useState([]);

  function validateItem(item: Array<string>, index: string, selection: string) {
    forEach(item, (element) => {
      let positionOfElement = split(element, "-")[0];
      if (positionOfElement === selection) {
        options.push({ [index]: element });
      }
    });
  }

  useEffect(() => {
    forEach(toPairs(Unlockables), (element, i) => {
      let item = element[1];
      let index = element[0];
      validateItem(item, index, variant);
    });
    setButtonOptions(options);
  }, []);

  return (
    <View style={styles.fullContainer}>
      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContainerContent}
        >
          {buttonOptions.map((item) => (
            <ButtonOption
              key={item.toString()}
              level={parseInt(keys(item)[0])}
              variant={values(item)[0]}
              closeFunction={() => closeFunction()}
            />
          ))}
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
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
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
});

export default ControllerOptionModal;
