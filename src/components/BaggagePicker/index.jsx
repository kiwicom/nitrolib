// @flow strict
import * as React from "react";
import R from "ramda";

import Picker from "./components/Picker";
import type {
  BaggageType,
  BaggageCategory,
  PassengerGroup,
  Combination,
  HandBagDefinition,
  HoldBagDefinition,
  OptionBaggage,
} from "../../records/Baggage";

type Props = {
  changeBagCombination: () => void,
  passengerCategory: PassengerGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean,
  airlines: Array<string>, // eslint-disable-line
  pickerType: BaggageCategory,
  context: "booking" | "mmb",
};

class Baggage extends React.Component<Props> {
  getOptionItems = (definitions: HoldBagDefinition | HandBagDefinition, indices: Array<number>) =>
    indices.reduce((acc, optionIndex) => {
      const key = optionIndex.toString();
      if (acc[key]) {
        acc[key].amount += 1;
      } else {
        acc[key] = {
          amount: 1,
          category: definitions[optionIndex].category,
          restrictions: definitions[optionIndex].restrictions,
          conditions: definitions[optionIndex].conditions,
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

    const indexedCombinations: Array<Combination & { originalIndex: number }> = combinations[
      pickerType
    ].map((item, index) => {
      item.originalIndex = index; // eslint-disable-line
      return item;
    });
    const bagCombinations = indexedCombinations.filter(i =>
      // $FlowFixMe
      R.includes(passengerCategory, i.conditions.passengerGroups),
    );

    const bagDefinitions = definitions[pickerType];

    const options: Array<OptionBaggage> = bagCombinations.map(c => ({
      originalIndex: c.originalIndex,
      pickerType,
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
      // airlines,
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
