import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors } from "../../../constants/Colors";
import _ from "lodash";

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
    _.forEach(item, (element) => {
      let positionOfElement = _.split(element, "-")[0];
      if (positionOfElement === selection) {
        options.push({ [index]: element });
      }
    });
  }

  useEffect(() => {
    _.forEach(_.toPairs(Unlockables), (element, i) => {
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
          contentContainerStyle={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {buttonOptions.map((item) => (
            <ButtonOption
              level={parseInt(_.keys(item)[0])}
              variant={_.values(item)[0]}
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
});

export default ControllerOptionModal;
