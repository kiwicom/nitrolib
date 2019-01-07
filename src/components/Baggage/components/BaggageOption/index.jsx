// @flow
import * as React from "react";
import styled from "styled-components";
import R from "ramda";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import PriorityBoarding from "@kiwicom/orbit-components/lib/icons/PriorityBoarding";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import Translate from "../../../Translate/index";
import OptionItem from "../OptionItem/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type { Price, Item } from "../../../../records/Baggage";

type Props = {
  items: { [key: string]: Item },
  price: Price,
  isChecked: boolean,
  onClick: () => void,
  shouldShowRecheckNote: boolean,
};

type OptionWrapperProps = ThemeProps & {
  checked: boolean,
};

const OptionWrapper = styled.div`
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  border: 1px solid
    ${({ theme, checked }: OptionWrapperProps) =>
      checked ? theme.orbit.colorTextButtonPrimaryBordered : theme.orbit.borderColorCard};
  &:hover {
    border-color: ${({ theme }: ThemeProps) => theme.orbit.borderColorCheckboxRadioHover};
  }
  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const RadioWrapper = styled.div`
  width: 20px;
`;

OptionWrapper.defaultProps = {
  theme: themeDefault,
  checked: false,
};

const getTextFromCategory = category => {
  switch (category) {
    case "personalItem":
      return <Translate t="common.baggage.personal_item" />;
    case "cabinBag":
      return <Translate t="common.baggage.cabin_bag" />;
    case "holdBag":
      return <Translate t="common.baggage.checked_bag" />;
    default:
      return <Translate t="common.baggage.no_checked_baggage" />;
  }
};

const getIconFromCategory = category => {
  switch (category) {
    case "personalItem":
      return <BaggagePersonalItem size="medium" color="primary" />;
    case "cabinBag":
      return <BaggageCabin size="medium" color="primary" />;
    case "holdBag":
      return <BaggageChecked size="medium" color="primary" />;
    default:
      return <Close size="medium" color="primary" />;
  }
};

const getAirlinesWithPriorityBoarding = itemsArray => {
  const airlines = itemsArray.reduce((acc, item) => {
    if (item.conditions && item.conditions.is_priority) {
      return [...acc, ...item.conditions.is_priority];
    }
    return acc || [];
  }, []);
  return R.uniq(airlines);
};

const IconWrapper = styled.div`
  border-top: 1px solid grey;
  margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceXSmall};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

const arrToHumanString = (arr: Array<string>): string => {
  if (arr.length === 1) return arr[0];
  const firsts = arr.slice(0, -1);
  const last = arr.slice(-1)[0];
  return `${firsts.join(", ")} and ${last}`;
};

const PriorityBoardingInfo = ({ airlines }: { airlines: Array<string> }) => (
  <Stack flex direction="row" align="center">
    <IconWrapper>
      <PriorityBoarding color="secondary" size="small" />
    </IconWrapper>
    <Text size="small" element="p">
      <Translate
        t="common.baggage.priority_boarding"
        values={{ airlines: arrToHumanString(airlines) }}
      />
      <TextLink external={false} onClick={() => {}} href="https://kiwi.com" type="secondary">
        <Translate t="common.baggage.learn_more" />
      </TextLink>
    </Text>
  </Stack>
);

const EmptyLabel = () => (
  <Stack spacing="condensed" flex align="center">
    {getIconFromCategory()}
    <Text>{getTextFromCategory()}</Text>
  </Stack>
);

const Option = ({ items, price, isChecked, onClick, shouldShowRecheckNote }: Props) => {
  const itemsArr = Object.keys(items).map(key => items[key]);
  const hasSingleItem = itemsArr.length === 1;
  const firstItem = itemsArr[0];
  const priorityAirlines = getAirlinesWithPriorityBoarding(itemsArr);

  return (
    <OptionWrapper onClick={onClick} checked={isChecked}>
      <Stack flex>
        <RadioWrapper>
          <Radio checked={isChecked} />
        </RadioWrapper>
        <Stack shrink flex spacing="extraTight" direction="column">
          {itemsArr.length > 0 ? (
            itemsArr.map((item, index) => (
              <OptionItem
                key={index} // eslint-disable-line
                amount={item.amount}
                restrictions={item.restrictions}
                isHoldBag={item.category === "holdBag"}
                firstItem={item === itemsArr[0]}
                categoryIcon={getIconFromCategory(item.category)}
                categoryName={getTextFromCategory(item.category)}
                price={price}
              />
            ))
          ) : (
            <EmptyLabel />
          )}
          {hasSingleItem && firstItem.category === "cabinBag" && (
            <Stack flex align="center" spacing="tight">
              <BaggagePersonalItemNone color={isChecked ? "warning" : "secondary"} />
              <Text type={isChecked ? "warning" : "secondary"}>No personal item</Text>
            </Stack>
          )}
          {priorityAirlines.length > 0 && <PriorityBoardingInfo airlines={priorityAirlines} />}
          {firstItem && firstItem.category === "holdBag" && isChecked && (
            <Alert>You must collect and recheck your baggage between certain flights.</Alert>
          )}
        </Stack>
      </Stack>
      {shouldShowRecheckNote && firstItem && firstItem.category === "holdBag" && isChecked && (
        <Alert>You must collect and recheck your baggage between certain flights.</Alert>
      )}
    </OptionWrapper>
  );
};

export default Option;
