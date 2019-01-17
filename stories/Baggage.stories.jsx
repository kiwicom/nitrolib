// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import Baggage from "../src/components/Baggage";
import baggageData from "../src/components/Baggage/services/data";

const handBagOptions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
};

const holdBagOptions = {
  first: 5,
  second: 6,
  third: 7,
  fourth: 8,
  fifth: 9,
  sixth: 10,
};

const props = {
  passengerIndex: 0,
  passengerCategory: "adult",
  changeBagCombination: (type, index) => {
    console.log(type, index); // eslint-disable-line
  },
  baggage: baggageData,
  hasDubaiAirport: true,
  selfTransferEnabled: true,
  selfTransferTooltip: "SelfTransferTooltip", // check current implementation
  disabledBagsInMmb: true,
  airlines: [],
  context: "booking",
};

storiesOf("Baggage", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("both", () => (
    <div style={{ padding: "24px" }}>
      <Baggage
        pickerType="handBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 6, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
      <Baggage
        pickerType="holdBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 6, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("handBag", () => (
    <div style={{ padding: "24px" }}>
      <Baggage
        pickerType="handBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 6, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("holdBag", () => (
    <div style={{ padding: "24px" }}>
      <Baggage
        pickerType="holdBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 6, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ));
