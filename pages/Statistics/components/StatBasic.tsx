import React from "react";
import { VStack } from "native-base";

import StatTitle from "./StatTitle";
import StatValue from "./StatValue";

interface StatBasicProps {
  titleLabel: string;
  valueLabel: number | string;
}

const StatBasic = ({ titleLabel, valueLabel }: StatBasicProps) => (
  <VStack>
    <StatTitle label={titleLabel} />
    <StatValue label={valueLabel} />
  </VStack>
);

export default StatBasic;
