// @flow strict
import * as React from "react";
import styled from "styled-components";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Text from "@kiwicom/orbit-components/lib/Text";
// Icons
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";

import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

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
      return <BaggagePersonalItem />;
    case "cabinBag":
      return <BaggageCabin />;
    case "holdBag":
      return <BaggageChecked />;
    default:
      return <Close />;
  }
};

const getBaggageSize = ({ height, length, weight, width }) =>
  `${length} x ${width} x ${height} cm, ${weight} kg`;

const BaggageWrapper = styled.div`
  margin-top: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid ${({ theme }: ThemeProps) => theme.orbit.borderColorCard};
`;

OptionWrapper.defaultProps = {
  theme: themeDefault,
};

const OptionLabel = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const BaggageItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const EmptyLabel = () => (
  <div>
    <Flex>
      {getIconFromCategory()}
      <Text>{getTextFromCategory()}</Text>
    </Flex>
  </div>
);

const Option = ({ items, price, isChecked, onClick }) => (
  <OptionWrapper onClick={onClick}>
    <div>
      <Radio checked={isChecked} />
    </div>
    <OptionLabel>
      {Object.keys(items).length > 0 ? (
        Object.keys(items).map(key => (
          <BaggageItem key={`item-${key}`}>
            <Flex>
              {getIconFromCategory(items[key].category)}
              {items[key].amount > 1 && <Text weight="bold">{items[key].amount}x</Text>}
              <Text>
                {items[key].category === "holdBag" && `${items[key].restrictions.weight}kg `}
                {getTextFromCategory(items[key].category)}
              </Text>
            </Flex>
            <Text>{getBaggageSize(items[key].restrictions)}</Text>
            {key === "0" ? (
              <Text weight="bold">
                {price.amount}
                {price.currency}
              </Text>
            ) : (
              <span />
            )}
          </BaggageItem>
        ))
      ) : (
        <EmptyLabel />
      )}
    </OptionLabel>
  </OptionWrapper>
);

const TitleWrapper = styled.div`
  display: flex;
`;

const BaggagePicker = ({ title, options, selectedIndex, onChange }) => {
  console.log("options", options);

  return (
    <BaggageWrapper>
      <TitleWrapper>
        <Text uppercase>{title}</Text>
        <InformationCircle size="small" color="secondary" />
      </TitleWrapper>
      <Text>Select one option:</Text>
      {Object.keys(options).map(key => (
        <Option
          key={options[key].originalIndex}
          items={options[key].items}
          price={options[key].price}
          isChecked={options[key].originalIndex === selectedIndex}
          onClick={() => onChange(options[key].bagType, options[key].originalIndex)}
        />
      ))}
    </BaggageWrapper>
  );
};

export default BaggagePicker;
