// @flow strict
import * as React from "react";

import BaggagePicker from "../BaggagePicker";
import type {
  BaggageType,
  BaggageGroup,
  HoldBagDefinition,
  HandBagDefinition,
} from "../../records/Baggage";

type Props = {
  passengerIndex: number, // eslint-disable-line
  changeBagCombination: () => void,
  passengerCategory: BaggageGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean, // eslint-disable-line
  selfTransferEnabled: boolean, // eslint-disable-line
  selfTransferTooltip: string, // eslint-disable-line
  disabledBagsInMmb: boolean, // eslint-disable-line
  hasDubaiAirport: boolean, // eslint-disable-line
  airlines: Array<string>, // eslint-disable-line
  pickerType: "handBag" | "holdBag",
  context: "booking" | "mmb", // eslint-disable-line
};

class Baggage extends React.Component<Props> {
  getOptionItems = (
    definitions: HoldBagDefinition | HandBagDefinition,
    combinations: Array<number>,
  ) =>
    combinations.reduce((acc, item) => {
      const key = item.toString();
      if (acc[key]) {
        acc[key].amount += 1;
      } else {
        acc[key] = {
          amount: 1,
          category: definitions[item].category,
          restrictions: definitions[item].restrictions,
          conditions: definitions[item].conditions,
        };
      }
      return acc;
    }, {});

  getBaggagePickerOptions = (type: string) => {
    const {
      baggage: { combinations, definitions },
      passengerCategory,
    } = this.props;

    const bagCombinations = combinations[passengerCategory][type];
    const bagDefinitions = definitions[type];

    const options = bagCombinations.map(c => ({
      originalIndex: c.originalIndex,
      bagType: type,
      price: c.price,
      items: this.getOptionItems(bagDefinitions, c.combination),
    }));

    return options;
  };

  getTitle = (type: string): string => (type === "handBag" ? "Cabin baggage" : "Checked baggage");

  getTooltip = (type: string): string =>
    type === "handBag"
      ? "Includes smaller bags that can be taken into the cabin and stored in the overhead locker or under your seat."
      : "Includes larger baggage items that you must deposit at the airline check-in counter before going through security at the airport.";

  render() {
    const {
      changeBagCombination,
      pickerType,
      passengerBaggage,
      shouldShowRecheckNote,
    } = this.props;
    const baggageOptions = this.getBaggagePickerOptions(pickerType);

    return (
      <BaggagePicker
        title={this.getTitle(pickerType)}
        tooltip={this.getTooltip(pickerType)}
        options={baggageOptions}
        selectedIndex={passengerBaggage[pickerType]}
        onChange={changeBagCombination}
        shouldShowRecheckNote={shouldShowRecheckNote}
      />
    );
  }
}

export default Baggage;
