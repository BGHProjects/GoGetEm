import React from "react";
import { View } from "react-native";
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
          firstItem={0}
          enableMomentum={false}
        />
      </View>
    </>
  );
};

export default SelectionCarousel;
