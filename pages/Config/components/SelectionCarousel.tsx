import React from "react";
import { View } from "react-native";
import { Divider } from "native-base";
import Carousel from "react-native-snap-carousel";
import SelectionHeader from "./SelectionHeader";

interface SelectionCarouselProps {
  headerLabel: string;
  values: any[];
  renderComponent: React.ReactNode;
  width: number;
  selectionWidth: number;
  operation: (arg1: any) => void;
  itemBuffer: number;
}

const SelectionCarousel = ({
  headerLabel,
  values,
  renderComponent,
  width,
  selectionWidth,
  operation,
  itemBuffer,
}: SelectionCarouselProps) => {
  return (
    <>
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
          firstItem={Math.floor(values.length / 2)}
          enableMomentum={false}
        />
        <Divider mt="10" w="80%" alignSelf="center" />
      </View>
    </>
  );
};

export default SelectionCarousel;
