import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../../constants/Colors";
import Carousel from "react-native-snap-carousel";

import ModalButton from "../../../components/ModalButton";
import { Backgrounds } from "../../../constants/Backgrounds";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface BGOptionModalProps {
  closeFunction: Function;
}

const bgOptions = Object.keys(Backgrounds);

const renderOption = (item?: any) => {
  return (
    <View style={styles.imageOptionContainer}>
      <ImageBackground
        source={Backgrounds[item.item]}
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
          100
        </AutoSizeText>
      </View>
    </View>
  );
};

const BGOptionModal = ({ closeFunction }: BGOptionModalProps) => {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.modalContainer}>
        <View style={styles.scrollContainer}>
          <Carousel
            data={bgOptions}
            renderItem={renderOption}
            sliderWidth={245}
            itemWidth={160}
            // onSnapToItem={(value) => {
            //   setSelectedColour(colourValues[value]);
            // }}
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
    borderColor: Colors.fluroBlue,
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
