import React, { useEffect } from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import SelectionHeader from "./SelectionHeader";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

interface SelectionCarouselProps {
  headerLabel: string;
  values: any[];
  renderComponent: React.ReactNode;
  width: number;
  selectionWidth: number;
  operation: (arg1: any) => void;
  itemBuffer: number;
  delay?: number;
}

const animValue = 500;

const SelectionCarousel = ({
  headerLabel,
  values,
  renderComponent,
  width,
  selectionWidth,
  operation,
  itemBuffer,
  delay = animValue,
}: SelectionCarouselProps) => {
  const isFocused = useIsFocused();
  const itemOpacity = useSharedValue(0);
  const itemScale = useSharedValue(0.7);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: itemOpacity.value,
      transform: [{ scale: itemScale.value }],
    };
  }, []);

  useEffect(() => {
    itemOpacity.value = 0;
    itemScale.value = 0.7;
    if (isFocused) {
      itemOpacity.value = withDelay(
        delay,
        withTiming(1, { duration: animValue })
      );
      itemScale.value = withDelay(
        delay,
        withTiming(1, { duration: animValue })
      );
    }
  }, [isFocused]);

  return (
    <Animated.View style={fadeStyle}>
      <SelectionHeader label={headerLabel} />
      <View style={{ marginBottom: 30 }}>
        <Carousel
          data={values}
          renderItem={renderComponent}
          sliderWidth={width}
          itemWidth={selectionWidth + itemBuffer}
          onSnapToItem={(value) => operation(value)}
          layout={"default"}
          inactiveSlideOpacity={0.5}
          activeAnimationType={"spring"}
          firstItem={0}
          enableMomentum={false}
        />
      </View>
    </Animated.View>
  );
};

export default SelectionCarousel;
