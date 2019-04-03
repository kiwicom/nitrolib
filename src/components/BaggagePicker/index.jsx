// @flow strict
import * as React from "react";

import Picker from "./components/Picker";
import type { BaggageType, BaggageCategory, PassengerGroup } from "../../records/Baggage";
import type { Airline } from "../../records/Airline";
import { Provider } from "./services/context";
import { getOptions } from "../../services/baggage/utils";

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
  prioBoardingLinkHandler: (Airline[]) => void,
};

const BaggagePicker = (props: Props) => {
  const {
    changeBagCombination,
    pickerType,
    passengerBaggage,
    passengerCategory,
    shouldShowRecheckNote,
    prioBoardingLinkHandler,
    context,
    airlines,
    currentCombination,
    baggage,
  } = props;

  const baggageOptions = getOptions({
    baggage,
    passengerCategory,
    context,
    pickerType,
    currentCombination,
  });

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
};

export default BaggagePicker;
