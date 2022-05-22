import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../constants/GlobalStyles";
import { XYStart, XYEnd } from "../constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { isUndefined } from "lodash";

interface PlayerAvatarProps {
  top: number;
  left: number;
  colour: string[];
  delay?: number;
}

// TODO Decide if the "- 5" should be handled outside of this component or not
/**
 * Represents the avatars seen in the game
 * @param param0 Top is Y, left is X, colour and delay are self-explanatory
 * @returns The player representation in the game
 */
const PlayerAvatar = ({ top, left, colour, delay }: PlayerAvatarProps) => {
  const XPos = useSharedValue(left);
  const YPos = useSharedValue(top);

  const movementStyle = useAnimatedStyle(() => {
    return {
      top: `${YPos.value - 5}%`,
      left: `${XPos.value - 5}%`,
    };
  });

  const movement = () => {
    /**
     * Delay is divided by 2, so there is no delay between when players
     * collide on the screen and in the logic
     * (e.g. There is a slight 'gap' to allow for any logic to apply between animations)
     */
    if (!isUndefined(delay)) {
      (XPos.value = withTiming(left, { duration: delay / 2 })),
        (YPos.value = withTiming(top, { duration: delay / 2 }));
    }
  };

  useEffect(() => {
    if (!isUndefined(delay)) {
      movement();
    }
  }, [top, left]);

  return (
    <Animated.View
      style={[
        globalStyles().playerContainer,
        !isUndefined(delay)
          ? movementStyle
          : { top: `${top - 5}%`, left: `${left - 5}%` },
      ]}
    >
      <View style={[globalStyles().playerAvatar]}>
        <LinearGradient
          style={globalStyles().gradientFill}
          colors={colour}
          start={XYStart}
          end={XYEnd}
        />
      </View>
    </Animated.View>
  );
};

export default PlayerAvatar;
