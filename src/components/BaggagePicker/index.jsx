// @flow strict
import * as React from "react";
import R from "ramda";

import Picker from "./components/Picker";
import type {
  BaggageType,
  BaggageGroup,
  OptionBaggage,
  HoldBagDefinition,
  HandBagDefinition,
} from "../../records/Baggage";

type Props = {
  changeBagCombination: () => void,
  passengerCategory: BaggageGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean,
  selfTransferEnabled: boolean, // eslint-disable-line
  selfTransferTooltip: string, // eslint-disable-line
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

  getOptions = () => {
    const {
      baggage: { combinations, definitions },
      passengerCategory,
      pickerType,
    } = this.props;

    const bagCombinations = combinations[pickerType]
      .map((item, index) => {
        item.originalIndex = index; // eslint-disable-line
        return item;
      })
      .filter(i => R.includes(passengerCategory, i.conditions.passengerGroups));

    const bagDefinitions = definitions[pickerType];

    const options: Array<OptionBaggage> = bagCombinations.map(c => ({
      originalIndex: c.originalIndex,
      bagType: pickerType,
      price: c.price,
      items: this.getOptionItems(bagDefinitions, c.indices),
    }));

    return options;
  };

  render() {
    const {
      changeBagCombination,
      pickerType,
      passengerBaggage,
      shouldShowRecheckNote,
      context,
    } = this.props;
    const baggageOptions = this.getOptions();

    return (
      <Picker
        context={context}
        pickerType={pickerType}
        options={baggageOptions}
        selectedIndex={passengerBaggage[pickerType]}
        onChange={changeBagCombination}
        shouldShowRecheckNote={shouldShowRecheckNote}
      />
    );
  }
}

export default Baggage;
