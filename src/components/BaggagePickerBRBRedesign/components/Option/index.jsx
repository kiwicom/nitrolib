// @flow strict
import * as React from "react";
import styled from "styled-components";
import * as R from "ramda";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import PriorityBoardingInfo from "./components/PriorityBoardingInfo";
import EmptyLabel from "./components/EmptyLabel";
import Translate from "../../../Translate";
import OptionItem from "../OptionItem";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type { ItemType, BaggageCategory } from "../../../../records/Baggage";
import type { PriceType } from "../../../../records/Price";
import getAirlinesWithPriorityBoarding from "./services/getAirlinesWithPriorityBoarding";
import type { Airlines, Airline } from "../../../../records/Airline";
import AddBlueRibbonBags from "./components/AddBlueRibbonBags";

type Props = {|
  items: { [key: string]: ItemType },
  price: PriceType,
  dataTest?: string,
  isChecked: boolean,
  isCurrentCombination: boolean,
  onClick: () => void,
  pickerType: BaggageCategory,
  isPersonalItemPresent: boolean,
  airlines?: Airlines,
  shouldShowRecheckNote?: boolean,
  prioBoardingLinkHandler?: (arg: Airline[]) => void,
  shouldShowAddBlueRibbonBag: boolean,
  blueRibbonBagPrice: PriceType,
  isBlueRibbonBagAdded: boolean,
  addBlueRibbonBag: () => void,
  removeBlueRibbonBag: () => void,
  openBlueribbonBagsSmartFAQ: () => void,
|};

type WrapperProps = {|
  ...ThemeProps,
  checked: boolean,
  dataTest: string,
|};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.orbit.paletteWhite};
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  box-shadow: 0 1px 2px 0 ${({ theme }: ThemeProps) => theme.orbit.paletteWhiteHover};
  border: solid 2px
    ${({ theme, checked }: WrapperProps) =>
      checked ? `${theme.orbit.colorTextButtonPrimaryBordered}` : `${theme.orbit.borderColorCard}`};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  outline: solid 1px white;
  outline-offset: ${({ checked }) => (checked ? "-3px" : "-2px")};
  overflow: auto;
  &:hover {
    cursor: pointer;
    border-color: ${({ theme }: ThemeProps) => theme.orbit.borderColorCheckboxRadioHover};
    outline-offset: -3px;
  }

  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;

Wrapper.defaultProps = {
  dataTest: "BaggagePickerBRBRedesign-Option",
  theme: themeDefault,
  checked: false,
};

const RadioWrapper = styled.div`
  div {
    margin-top: 2px;
  }
`;

const Option = ({
  items,
  price,
  dataTest,
  isChecked,
  onClick,
  isCurrentCombination,
  pickerType,
  isPersonalItemPresent,
  airlines,
  shouldShowRecheckNote,
  prioBoardingLinkHandler,
  shouldShowAddBlueRibbonBag,
  blueRibbonBagPrice,
  isBlueRibbonBagAdded,
  addBlueRibbonBag,
  removeBlueRibbonBag,
  openBlueribbonBagsSmartFAQ,
}: Props) => {
  const itemsArr = R.values(items);
  const firstItem = R.head(itemsArr);
  const priorityAirlines = getAirlinesWithPriorityBoarding(itemsArr)
    .map((key: string) => airlines?.[key])
    .filter(Boolean);

  const isHoldBag = pickerType === "holdBag";

  return (
    <Wrapper onClick={onClick} checked={isChecked} data-test={dataTest}>
      <Stack flex spacing="condensed" mediumMobile={{ spacing: "natural" }}>
        <RadioWrapper>
          <Radio checked={isChecked} onChange={onClick} />
        </RadioWrapper>
        <Stack shrink flex spacing="extraTight" direction="column">
          {itemsArr.length > 0 ? (
            itemsArr.map((item, index) => (
              <OptionItem
                key={index} // eslint-disable-line
                amount={item.amount}
                restrictions={item.restrictions}
                category={item.category}
                isFirstItem={index === 0}
                price={price}
                isCurrentCombination={isCurrentCombination}
              />
            ))
          ) : (
            <EmptyLabel pickerType={pickerType} isCurrentCombination={isCurrentCombination} />
          )}
          {firstItem?.category === "cabinBag" && isPersonalItemPresent && (
            <Stack
              flex
              align="center"
              spacing="tight"
              dataTest="BaggagePickerBRBRedesign-NoPersonalItemLabel"
            >
              <BaggagePersonalItemNone color={isChecked ? "warning" : "secondary"} />
              <Text type={isChecked ? "warning" : "secondary"}>
                <Translate t="baggage_modal.select.no_personal_item" />
              </Text>
            </Stack>
          )}
          {priorityAirlines.length > 0 && (
            <PriorityBoardingInfo
              airlines={priorityAirlines}
              prioBoardingLinkHandler={prioBoardingLinkHandler}
            />
          )}
        </Stack>
      </Stack>
      {shouldShowRecheckNote && firstItem?.category === "holdBag" && isChecked && (
        <Alert dataTest="BaggagePickerBRBRedesign-RecheckAlert">
          <Translate t="baggage_modal.alert.collect_and_recheck" />
        </Alert>
      )}
      {itemsArr.length > 0 && isChecked && isHoldBag && shouldShowAddBlueRibbonBag && (
        <AddBlueRibbonBags
          blueRibbonBagPrice={blueRibbonBagPrice}
          isBlueRibbonBagAdded={isBlueRibbonBagAdded}
          addBlueRibbonBag={addBlueRibbonBag}
          removeBlueRibbonBag={removeBlueRibbonBag}
          openBlueribbonBagsSmartFAQ={openBlueribbonBagsSmartFAQ}
        />
      )}
    </Wrapper>
  );
};

export default Option;
