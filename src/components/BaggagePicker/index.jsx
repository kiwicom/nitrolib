// @flow strict
import * as React from "react";
import styled from "styled-components";
import Radio from "@kiwicom/orbit-components/lib/Radio";
import Text from "@kiwicom/orbit-components/lib/Text";
import Button from "@kiwicom/orbit-components/lib/Button";
// Icons
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import ChevronUp from "@kiwicom/orbit-components/lib/icons/ChevronUp";

import Flex from "../../primitives/Flex";
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
  border-radius: 3px;
  border: 1px solid
    ${({ theme, checked }: { theme: ThemeProps, checked: boolean }) =>
      checked ? theme.orbit.colorTextButtonPrimaryBordered : theme.orbit.borderColorCard};
`;

OptionWrapper.defaultProps = {
  theme: themeDefault,
  checked: false,
};

const OptionLabel = styled.div`
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
`;

const BaggageItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const EmptyLabel = () => (
  <Flex y="center">
    {getIconFromCategory()}
    <Text>{getTextFromCategory()}</Text>
  </Flex>
);

const RadioWrapper = styled.div`
  margin-right: 16px;
`;

const Option = ({ items, price, isChecked, onClick }) => {
  const hasSingleCategory = Object.keys(items).length === 1;
  const category = items["1"] && items["1"].category;
  const firstItemKey = Object.keys(items)[0];
  return (
    <OptionWrapper onClick={onClick} checked={isChecked}>
      <RadioWrapper>
        <Radio checked={isChecked} />
      </RadioWrapper>
      <OptionLabel>
        {Object.keys(items).length > 0 ? (
          Object.keys(items).map(key => (
            <BaggageItem key={`item-${key}`}>
              <FlexWrapper>
                {getIconFromCategory(items[key].category)}
                <Text>
                  {items[key].amount > 1 && (
                    <Text element="span" weight="bold">
                      {`${items[key].amount}x `}
                    </Text>
                  )}
                  {items[key].category === "holdBag" && `${items[key].restrictions.weight}kg `}
                  {getTextFromCategory(items[key].category)}
                </Text>
              </FlexWrapper>
              <Text type="secondary">{getBaggageSize(items[key].restrictions)}</Text>
              {key === firstItemKey ? (
                <Text weight="bold">{`${price.amount} ${price.currency}`}</Text>
              ) : (
                <span style={{ width: "47px" }} />
              )}
            </BaggageItem>
          ))
        ) : (
          <EmptyLabel />
        )}
        {hasSingleCategory && category === "cabinBag" && (
          <Flex y="center">
            <Close color={isChecked ? "warning" : "secondary"} />
            <Text type={isChecked ? "warning" : "secondary"}>No personal item</Text>
          </Flex>
        )}
      </OptionLabel>
    </OptionWrapper>
  );
};

const TitleWrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

type Props = any;

type State = {
  showedOptionsKeys: Array<number>,
  hiddenOptionsNumber: number,
};
class BaggagePicker extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showedOptionsKeys: [],
      hiddenOptionsNumber: 0,
    };
  }

  componentDidMount() {
    const { options } = this.props;
    const optionsKeys = Object.keys(options);
    if (optionsKeys.length > 4) {
      const showedOptionsKeys = optionsKeys.slice(0, 3);
      const hiddenOptionsNumber = optionsKeys.length - showedOptionsKeys.length;
      this.setState({
        showedOptionsKeys,
        hiddenOptionsNumber,
      });
    } else {
      this.setState({ showedOptionsKeys: optionsKeys, hiddenOptionsNumber: 0 });
    }
  }

  handleToggleOptions = () => {
    const { options } = this.props;
    const optionsKeys = Object.keys(options);
    const { showedOptionsKeys } = this.state;
    if (showedOptionsKeys.length === optionsKeys.length) {
      const slicedOptionKeys = optionsKeys.slice(0, 3);
      const hiddenOptionsNumber = optionsKeys.length - slicedOptionKeys.length;
      this.setState({
        showedOptionsKeys: slicedOptionKeys,
        hiddenOptionsNumber,
      });
    } else {
      this.setState({ showedOptionsKeys: optionsKeys, hiddenOptionsNumber: 0 });
    }
  };

  render() {
    const { title, options, selectedIndex, onChange } = this.props;
    const { showedOptionsKeys, hiddenOptionsNumber } = this.state;
    const optionsKeys = Object.keys(options);

    return (
      <BaggageWrapper>
        <TitleWrapper>
          <Text uppercase>{title}</Text>
          <InformationCircle size="small" color="secondary" />
        </TitleWrapper>
        <Text>Select one option:</Text>
        {showedOptionsKeys.map(key => (
          <Option
            key={options[key].originalIndex}
            items={options[key].items}
            price={options[key].price}
            isChecked={options[key].originalIndex === selectedIndex}
            onClick={() => onChange(options[key].bagType, options[key].originalIndex)}
          />
        ))}
        {optionsKeys.length > 4 && (
          <ButtonWrapper>
            <Button
              onClick={this.handleToggleOptions}
              size="small"
              type="secondary"
              iconRight={hiddenOptionsNumber > 0 ? <ChevronDown /> : <ChevronUp />}
            >
              {hiddenOptionsNumber > 0 ? `Show ${hiddenOptionsNumber} more bundles` : "Hide"}
            </Button>
          </ButtonWrapper>
        )}
      </BaggageWrapper>
    );
  }
}

export default BaggagePicker;
