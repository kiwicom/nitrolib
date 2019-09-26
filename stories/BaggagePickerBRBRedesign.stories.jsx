// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import { BaggageCabin } from "@kiwicom/orbit-components/lib/icons";

import withData from "./decorators/withData";
import airlines from "./fixtures/airlines";
import BaggagePickerBRBRedesign from "../src/components/BaggagePickerBRBRedesign";
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
  changeBagCombination: action("changing bag combination..."),
  baggage: baggageData,
  airlines,
  context: "booking",
  prioBoardingLinkHandler: action("handling prio boarding link..."),
  blueRibbonBagPrice: {
    amount: 4.99,
    base: 4.99,
    service: 0,
    serviceFlat: 0,
    merchant: 0,
    currency: "EUR",
  },
  addBlueRibbonBag: action("adding Blue Ribbon Bag service..."),
  removeBlueRibbonBag: action("removing Blue Ribbon Bag service..."),
  openBlueribbonBagsSmartFAQ: action("opening SmartFAQ article for Blue Ribbon Bag service..."),
};

storiesOf("BaggagePickerBRBRedesign", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("booking", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
      />
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("mmb -- BRB intentionally not visible", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePickerBRBRedesign
        pickerType="handBag"
        passengerCategory={select(
          "Passenger category",
          passengerCategoryOptions,
          "adult",
          "Baggage",
        )}
        passengerBaggage={{
          handBag: select("Handbag", handBagOptions, 2, "Baggage"),
          holdBag: select("Holdbag", holdBagOptions, 2, "Baggage"),
        }}
        shouldShowRecheckNote={boolean("shouldShowRecheckNote", false, "Baggage")}
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
        context="mmb"
        currentCombination={2}
      />
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
        context="mmb"
        currentCombination={1}
      />
    </div>
  ))
  .add("both empty", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
        baggage={emptyData}
      />
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
        baggage={emptyData}
      />
    </div>
  ))
  .add("handBag -- BRB intentionally not visible", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("holdBag", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        {...props}
      />
    </div>
  ))
  .add("handBag -- with description", () => (
    <div style={{ padding: "24px" }}>
      <BaggagePickerBRBRedesign
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
        isBlueRibbonBagAdded={boolean("isBlueRibbonBagAdded", false, "Baggage")}
        shouldShowAddBlueRibbonBag={boolean("shouldShowAddBlueRibbonBag", true, "Baggage")}
        description={
          <Alert type="info" icon={<BaggageCabin />} spaceAfter="small">
            Additional information about adding a cabin bag.
          </Alert>
        }
        {...props}
      />
    </div>
  ));
