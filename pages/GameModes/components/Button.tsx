import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { Feather as Icon, Ionicons } from "@expo/vector-icons";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Side } from "../../../components/Wave";
import { isUndefined } from "lodash";
import { Logos } from "../../../constants/Images";
import { Colors } from "react-native/Libraries/NewAppScreen";

const { width } = Dimensions.get("screen");
const RADIUS = 25;
const imgSize = 40;

interface ButtonProps {
  position: Vector<Animated.SharedValue<number>>;
  side: Side;
  activeSide: Animated.SharedValue<Side>;
  image?: string;
}

const Button = ({ position, side, activeSide, image }: ButtonProps) => {
  const isLeft = side === Side.LEFT;
  const [offset, setOffset] = useState(0);

  // This is so changing to a new image rerenders the UI
  useEffect(() => {
    if (!!image) {
      setOffset(10);
    } else {
      setOffset(0);
    }
  }, [image]);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: isLeft
      ? position.x.value - RADIUS * 2 - offset
      : width - position.x.value + offset,
    top: position.y.value - RADIUS,
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    justifyContent: "center",
    alignItems: "center",
    opacity: withTiming(activeSide.value === Side.NONE ? 1 : 0),
  }));

  return (
    <Animated.View style={style}>
      {!isUndefined(image) && image !== "questionMark" && (
        <Image
          style={styles.logoImage}
          source={Logos[image as keyof typeof Logos]}
        />
      )}

      {!isUndefined(image) && image === "questionMark" && (
        <Ionicons name="help" size={40} color={Colors.white} />
      )}

      {isUndefined(image) && (
        <Icon
          name={`chevron-${isLeft ? "right" : "left"}` as const}
          size={24}
          color="white"
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    height: imgSize,
    width: imgSize,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default Button;
