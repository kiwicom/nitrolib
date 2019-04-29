// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import airlines from "./fixtures/airlines";
import BaggagePicker from "../src/components/BaggagePicker";
import { baggageData, emptyData } from "../src/records/__mocks__/baggageData";

const handBagOptions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
  seventh: 6,
};

const holdBagOptions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
};

const passengerCategoryOptions = {
  adult: "adult",
  teen: "teen",
  child: "child",
  infant: "infant",
};

const props = {
  changeBagCombination: () => {},
  baggage: baggageData,
  airlines,
  context: "booking",
  prioBoardingLinkHandler: () => {},
};

storiesOf("BaggagePicker", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("booking", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        pickerType="handBag"
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
      <BaggagePicker
        pickerType="holdBag"
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("mmb", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        pickerType="handBag"
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
        context="mmb"
        currentCombination={0}
      />
      <BaggagePicker
        pickerType="holdBag"
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 1, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 1, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        {...props}
        context="mmb"
        currentCombination={1}
      />
    </div>
  ))
  .add("both empty", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePicker
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
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
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
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
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
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
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
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
