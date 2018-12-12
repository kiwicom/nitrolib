// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";

import type { BaggageType } from "../src/components/Baggage/types";
import Baggage from "../src/components/Baggage";
import baggageData from "../src/components/Baggage/baggageData";


const props = {
  passengerIndex: 0,
  passengerCategory: "adult",
  passengerBaggage: { handBag: 1, holdBag: 7 },
  changeBagCombination: (type, index) => {
    console.log(type, index);
  },
  baggage: baggageData,
  shouldShowRecheckNote: true,
  selfTransferEnabled: true,
  selfTransferTooltip: "SelfTransferTooltip", // check current implementation
  disabledBagsInMmb: true,
  hasDubaiAirport: true,
  airlines: [],
};

storiesOf("Baggage", module).add("default", () => (
  <div style={{ padding: "24px" }}>
    <Baggage {...props} />
  </div>
));
