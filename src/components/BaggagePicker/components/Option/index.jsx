// @flow
import * as React from "react";
import styled from "styled-components";
import R from "ramda";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import PriorityBoarding from "@kiwicom/orbit-components/lib/icons/PriorityBoarding";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import Translate from "../../../Translate/index";
import OptionItem from "../OptionItem/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type { ItemType, BaggageCategory } from "../../../../records/Baggage";
import type { PriceType } from "../../../../records/Price";
import { Consumer } from "../../services/context";

type Props = {
  items: { [key: string]: ItemType },
  price: PriceType,
  isChecked: boolean,
  isCurrentCombination: boolean,
  onClick: () => void,
  pickerType: BaggageCategory,
};

type OptionWrapperProps = ThemeProps & {
  checked: boolean,
};

const OptionWrapper = styled.div`
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  box-shadow: 0 1px 2px 0 ${({ theme }: ThemeProps) => theme.orbit.paletteWhiteHover};
  border: solid 2px
    ${({ theme, checked }: OptionWrapperProps) =>
      checked ? `${theme.orbit.colorTextButtonPrimaryBordered}` : `${theme.orbit.borderColorCard}`};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  outline: solid 1px white;
  outline-offset: ${({ checked }) => (checked ? "-3px" : "-2px")};
  &:hover {
    cursor: pointer;
    border-color: ${({ theme }: ThemeProps) => theme.orbit.borderColorCheckboxRadioHover};
    outline-offset: -3px;
    /* div { slylelint no-descending-specificity
      border-color: ${({ theme }: ThemeProps) => theme.orbit.borderColorCheckboxRadioHover};
    } */
  }

  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;

OptionWrapper.defaultProps = {
  theme: themeDefault,
  checked: false,
};

const RadioWrapper = styled.div`
  width: 20px;
  div {
    margin-top: 2px;
  }
`;

const IconWrapper = styled.div`
  border-top: 1px solid ${({ theme }: ThemeProps) => theme.orbit.borderColorInput};
  width: 22px;
  text-align: center;
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

const PriorityBoardingInfo = ({ airlines }: { airlines: Array<string> }) => {
  return (
    <Stack flex direction="row" spacing="condensed" align="center">
      <IconWrapper>
        <PriorityBoarding color="secondary" size="small" />
      </IconWrapper>
      <Text size="small" element="p">
        <Translate t="baggage_modal.priority_boarding" values={{ airlines: airlines.join(", ") }} />{" "}
        <TextLink external={false} onClick={() => {}} href="https://kiwi.com" type="secondary">
          <Translate t="baggage_modal.learn_more" />
        </TextLink>
      </Text>
    </Stack>
  );
};

const EmptyLabel = ({ pickerType }: { pickerType: BaggageCategory }) => (
  <Stack spacing="condensed" flex align="center">
    <Close size="medium" />
    <Text>
      <Translate
        t={
          pickerType === "handBag"
            ? "baggage_modal.select.no_cabin_baggage"
            : "baggage_modal.select.no_checked_baggage"
        }
      />
    </Text>
  </Stack>
);

const Option = ({ items, price, isChecked, onClick, isCurrentCombination, pickerType }: Props) => {
  const itemsArr = Object.keys(items).map(key => items[key]);
  const hasSingleItem = itemsArr.length === 1;
  const firstItem = itemsArr[0];

  const getAirlinesWithPriorityBoarding = itemsArray => {
    const airlines = itemsArray.reduce((acc, item) => {
      if (item.conditions && item.conditions.isPriority) {
        return [...acc, ...item.conditions.isPriority];
      }
      return acc;
    }, []);
    return R.uniq(airlines);
  };

  return (
    <Consumer>
      {({ airlines, shouldShowRecheckNote }) => {
        const priorityAirlinesKeys = getAirlinesWithPriorityBoarding(itemsArr);
        const priorityAirlines = priorityAirlinesKeys
          .map(key => airlines && airlines[key] && airlines[key].name)
          .filter(Boolean);

        return (
          <OptionWrapper onClick={onClick} checked={isChecked}>
            <Stack flex>
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
                      firstItem={item === itemsArr[0]}
                      price={price}
                      isCurrentCombination={isCurrentCombination}
                    />
                  ))
                ) : (
                  <EmptyLabel pickerType={pickerType} />
                )}
                {hasSingleItem && firstItem.category === "cabinBag" && (
                  <Stack flex align="center" spacing="tight">
                    <BaggagePersonalItemNone color={isChecked ? "warning" : "secondary"} />
                    <Text type={isChecked ? "warning" : "secondary"}>
                      <Translate t="baggage_modal.select.no_personal_item" />
                    </Text>
                  </Stack>
                )}
                {priorityAirlines.length > 0 && (
                  <PriorityBoardingInfo airlines={priorityAirlines} />
                )}
              </Stack>
            </Stack>
            {shouldShowRecheckNote && firstItem && firstItem.category === "holdBag" && isChecked && (
              <Alert>
                <Translate t="baggage_modal.alert.collect_and_recheck" />
              </Alert>
            )}
          </OptionWrapper>
        );
      }}
    </Consumer>
  );
};

export default Option;
