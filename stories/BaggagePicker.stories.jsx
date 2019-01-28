// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import airlines from "./fixtures/airlines";
import BaggagePicker from "../src/components/BaggagePicker";
import { baggageData, emptyData } from "../src/components/BaggagePicker/services/data";

const handBagOptions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
};

const holdBagOptions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
};

const props = {
  passengerIndex: 0,
  passengerCategory: "adult",
  changeBagCombination: (type, index) => {
    console.log(type, index); // eslint-disable-line
  },
  baggage: baggageData,
  airlines,
  context: "booking",
};

storiesOf("BaggagePicker", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("both", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        pickerType="handBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
      <BaggagePicker
        pickerType="holdBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("both empty", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        pickerType="handBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
        baggage={emptyData}
      />
      <BaggagePicker
        pickerType="holdBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
        baggage={emptyData}
      />
    </div>
  ))
  .add("handBag", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        pickerType="handBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("holdBag", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        pickerType="holdBag"
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ));
