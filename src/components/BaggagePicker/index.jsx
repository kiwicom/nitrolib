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
import type { Airline } from "../../records/Airline";
import { Provider } from "./services/context";

type Props = {
  changeBagCombination: () => void,
  passengerCategory: PassengerGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean,
  airlines: { [string]: Airline },
  pickerType: BaggageCategory,
  context: "booking" | "mmb",
  currentCombination?: number,
  prioBoardingLinkHandler: (Array<Airline>) => void,
};

class Baggage extends React.Component<Props> {
  getOptionItems = (
    definitions: Array<HoldBagDefinition> | Array<HandBagDefinition>,
    indices: Array<number>,
  ) =>
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

    const indexedCombinations: Array<{ ...Combination, originalIndex: number }> = combinations[
      pickerType
    ]
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter(i =>
        // $FlowFixMe
        R.includes(passengerCategory, i.conditions.passengerGroups),
      );
    const bagDefinitions = definitions[pickerType];

    const options: Array<OptionBaggage> = indexedCombinations.map(c => ({
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
      prioBoardingLinkHandler,
      context,
      airlines,
      currentCombination,
    } = this.props;
    const baggageOptions = this.getOptions();

    return (
      <Provider value={{ airlines, shouldShowRecheckNote, prioBoardingLinkHandler }}>
        <Picker
          context={context}
          pickerType={pickerType}
          options={baggageOptions}
          selectedIndex={passengerBaggage[pickerType]}
          onChange={changeBagCombination}
          currentCombination={currentCombination}
        />
      </Provider>
    );
  }
}

export default Baggage;
