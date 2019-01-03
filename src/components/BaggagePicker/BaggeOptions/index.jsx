// @flow
import * as React from "react";
import styled from "styled-components";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Radio from "@kiwicom/orbit-components/lib/Radio";

import OptionItem from "./OptionItem";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import type { Price, Item } from "../../../records/Baggage";

type Props = {
  items: { [key: string]: Item },
  price: Price,
  isChecked: boolean,
  onClick: () => void,
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
`;

// TODO: fix it. Radio icon and baggage icons should have equal sizes
const RadioWrapper = styled.div`
  width: 20px;
  svg {
    height: 24px;
    width: 24px;
  }
`;

OptionWrapper.defaultProps = {
  theme: themeDefault,
  checked: false,
};

const getBaggageSize = ({ height, length, weight, width }) =>
  `${length} x ${width} x ${height} cm, ${weight} kg`;

const getTextFromCategory = category => {
  switch (category) {
    case "personalItem":
      return "Personal item";
    case "cabinBag":
      return "Cabin bag";
    case "holdBag":
      return "checked bag";
    default:
      return "No checked baggage";
  }
};

const getIconFromCategory = category => {
  switch (category) {
    case "personalItem":
      return <BaggagePersonalItem color="primary" />;
    case "cabinBag":
      return <BaggageCabin color="primary" />;
    case "holdBag":
      return <BaggageChecked color="primary" />;
    default:
      return <Close color="primary" />;
  }
};

const EmptyLabel = () => (
  <Stack spacing="condensed" flex align="center">
    {getIconFromCategory()}
    <Text>{getTextFromCategory()}</Text>
  </Stack>
);

const Option = ({ items, price, isChecked, onClick }: Props) => {
  const itemsArr = Object.keys(items).map(key => items[key]);
  const hasSingleCategory = itemsArr.length === 1;
  const firstItem = itemsArr[0];

  return (
    <OptionWrapper onClick={onClick} checked={isChecked}>
      <Stack flex>
        <RadioWrapper>
          <Radio />
        </RadioWrapper>
        <Stack shrink flex direction="column">
          {itemsArr.length > 0 ? (
            itemsArr.map(item => (
              <OptionItem
                amount={item.amount}
                restrictions={item.restrictions}
                holdBag={item.category === "holdBag"}
                firstItem={item === itemsArr[0]}
                categoryIcon={getIconFromCategory(item.category)}
                categoryName={getTextFromCategory(item.category)}
                baggageSize={getBaggageSize(item.restrictions)}
                price={price}
              />
            ))
          ) : (
            <EmptyLabel />
          )}
          {hasSingleCategory && firstItem.category === "cabinBag" && (
            <Stack flex align="center" spacing="tight">
              <Close color={isChecked ? "warning" : "secondary"} />
              <Text type={isChecked ? "warning" : "secondary"}>No personal item</Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </OptionWrapper>
  );
};

export default Option;
