// @flow strict
import * as React from "react";
import styled from "styled-components";
import BaggageSet from "@kiwicom/orbit-components/lib/icons/BaggageSet";
import CardHeader from "@kiwicom/orbit-components/lib/Card/CardHeader";

import BaggagePicker from "../BaggagePicker";
import type { BaggageType, BaggageGroup } from "./types";

type Props = {
  passengerIndex: number,
  changeBagCombination: () => void,
  passengerCategory: BaggageGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean,
  selfTransferEnabled: boolean,
  selfTransferTooltip: string, // temp type
  disabledBagsInMmb: boolean,
  hasDubaiAirport: boolean,
  airlines: Array<*>,
};

class Baggage extends React.Component<Props> {
  getBaggagePickerOptions = type => {
    const {
      baggage: { combinations, definitions },
      passengerCategory,
    } = this.props;

    const bagCombinations = combinations[passengerCategory][type];
    const bagDefinitions = definitions[type];
    const bagOptions = bagCombinations.map(c => c.combination.map(item => bagDefinitions[item]));

    const bagOptionsWithPrice = bagOptions.map((o, index) => ({
      items: o,
      bagType: type,
      price: bagCombinations[index].price,
      originalIndex: bagCombinations[index].originalIndex,
    }));

    return bagOptionsWithPrice;
  };

  render() {
    const handBagOptions = this.getBaggagePickerOptions("handBag");
    const holdBagOptions = this.getBaggagePickerOptions("holdBag");
    const {
      changeBagCombination,
      passengerBaggage: { handBag, holdBag },
    } = this.props;
    return (
      <>
        <CardHeader
          icon={<BaggageSet />}
          title="Baggage bundles"
          subTitle="Baggage options vary by carrier. We only offer bundles that are suitable for all your connections."
          dataTest="baggage-header"
        />
        <BaggagePicker
          title="Cabin baggage"
          options={handBagOptions}
          selectedIndex={handBag}
          onChange={changeBagCombination}
        />
        <BaggagePicker
          title="Checked baggage"
          options={holdBagOptions}
          selectedIndex={holdBag}
          onChange={changeBagCombination}
        />
      </>
    );
  }
}

export default Baggage;
